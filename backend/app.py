# app.py
from flask import Flask, jsonify
from celery import Celery
from pymongo import MongoClient
from helpers.apis import *
from helpers.getEnv import getCeleryBrokerUrl, getCeleryResultBackend
from helpers.mongodb import connectMongoDB, fetch_block, fetch_transaction, insert_block, insert_transaction
import os
from helpers.mongodb import connectMongoDB

app = Flask(__name__)
app.config['CELERY_BROKER_URL'] = getCeleryBrokerUrl()
app.config['CELERY_RESULT_BACKEND'] = getCeleryResultBackend()
app.config['CELERY_TIMEZONE'] = 'UTC'

celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)

# Define periodic task schedule
celery.conf.CELERYBEAT_SCHEDULE = {
    'task-fetch-block-data-job-every-30-seconds': {
        'task': 'app.fetch_block_data_job',
        'schedule': 30.0,
    },
}

client, db = connectMongoDB()

# This is a timed task that fetches the latest block data every 5 minutes
# Task to fetch current block data and process transactions
@celery.task
def fetch_block_data_job(block_number=None):
    # if parameter block_number is provided, fetch block data for that block number
    # else fetch block data for the latest block number
    if block_number is None:
        block_number = fetch_latest_block_number_api()

    # After getting the block number, fetch block data
    block_data = fetch_block_data_api(block_number)

    # Check if the block in not already added to the database
    if fetch_block(db, block_number) is not None:
        return "Block already processed"

    # Insert block data into MongoDB
    insert_block(db, block_data)

    transactions_to_process = block_data.get('transactions', [])

   # Trigger task to process transactions with delay
    delay_seconds = getJobDelaySeconds()
    for index, transaction_hash in enumerate(transactions_to_process):
        process_transaction_job.apply_async((transaction_hash,), countdown=index * delay_seconds)

      
    return "Block data fetched and transactions processed successfully"

# This is a event based task that processes individual transaction data, when asked by the fetch_block_data task
# Task to process individual transaction data
@celery.task
def process_transaction_job(transaction_hash):
    # Add this call as a try catch, to handle the case when the transaction is not found or updating to monogdb was not successful
    # if transaction is not found re add this task to the end of the queue
    try:
        # Fetch transaction data
        transaction_data = fetch_transaction_data_api(transaction_hash)
        # Insert transaction data into MongoDB
        insert_transaction(db, transaction_data)
        return "Transaction processed successfully"
    except ValueError as e:
        process_transaction_job.retry(countdown=60, exc=e)
        return

# Routes
@app.route('/')
def home():
    return jsonify({"message": "Hello, World!"})

# Fetch block data for a given block number
@app.route('/fetch-block-data/<int:block_number>')
def fetch_block_data(block_number):
    txn_data = fetch_block(db, block_number)
    if txn_data is None:
        return jsonify({"message": "Block not found"})
    return jsonify({
        "message" : "Block found",
            "data": txn_data    
    })

# Fetch transaction data for a given transaction hash
@app.route('/fetch-transaction-data/<string:transaction_hash>')
def fetch_transaction_data(transaction_hash):
    txn_data = fetch_transaction(db, transaction_hash)
    if txn_data is None:
        return jsonify({"message": "Transaction not found"})
    return jsonify({
        "message" : "Transaction found",
            "data": txn_data    
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
