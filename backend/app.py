# app.py
from celery import Celery
from pymongo import MongoClient
from helpers.apis import *
from helpers.getEnv import getCeleryBrokerUrl, getCeleryResultBackend, getJobDelaySeconds
from helpers.mongodb import connectMongoDB, fetch_block, fetch_transaction, insert_block, insert_transaction, update_latest_ingestion_block, fetch_ingestion_block, fetch_latest_ingested_block
import os
from flask_cors import CORS
from helpers.mongodb import connectMongoDB
from flask import Flask, request, jsonify 
app = Flask(__name__)

# TODO: Allow all origins
CORS(app)

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
 
    if block_number is not None:
        ingest_for_block_number = block_number
    else: 
        latest_available_block_number = fetch_latest_block_number_api()
        latest_ingested_block_number = fetch_latest_ingested_block(db)

        # if the latest block number is already ingested, return
        if latest_available_block_number == latest_ingested_block_number:
            return f"Block data already fetched for block number {latest_available_block_number}"
        
        elif latest_ingested_block_number is None:
            ingest_for_block_number = latest_available_block_number - 10
        else:
            ingest_for_block_number = latest_ingested_block_number + 1

    # fetch block data for the block number
    block_data = fetch_block_data_api(ingest_for_block_number)
    # insert block data into MongoDB
    block_information = {k: block_data[k] for k in set(list(block_data.keys())) - set(['transactions'])}
    insert_block(db, block_information)
    print(f"Block data ingested for block number {ingest_for_block_number}")
    # send for all the transactions to be processed  using process_block_based_transaction_job
    # create a list of transaction hashes
    transaction_hashes = [transaction['transaction_hash'] for transaction in block_data['transactions']]
    delay_seconds = getJobDelaySeconds()

    print(f"Processing {len(transaction_hashes)} transactions for {block_number} in {delay_seconds} seconds")
    # Calls for all the transactions to be processed together
    process_block_based_transaction_job.apply_async((transaction_hashes, block_data,), countdown=delay_seconds)
      
    return f"Block data fetched for block number {ingest_for_block_number}"

@celery.task
def process_block_based_transaction_job(transaction_hashes, block_data, start_index=0):
    # processing all the transactions in the block together, based on the start index
    # if a transaction fails it's call then dump this job and re add it to the queue from that transaction index

    block_number = block_data['block_number']

    # TODO: is there a better approach : Array iteration of about 447 indexes
    def get_transaction_information(block_data, transaction_hash):
        for transaction in block_data['transactions']:
            if transaction['transaction_hash'] == transaction_hash:
                return transaction
        return None

    def processing_individual_transaction(transaction_hash, block_number, index, transaction_metaInformation):
        # Check if the transaction in not already added to the database
        if fetch_transaction(db, transaction_hash) is not None:
            return f"Transaction {block_number}:{transaction_hash} already processed"

        # Fetch transaction data
        transaction_data = fetch_transaction_data_api(transaction_hash)
        transaction_data['block_number'] = block_number
        transaction_data['transaction_metaInformation'] = transaction_metaInformation
        # Insert transaction data into MongoDB
        insert_transaction(db, transaction_data)
        return f"Transaction {index} at {block_number} : {transaction_hash} processed successfully"

    for index, transaction_hash in enumerate(transaction_hashes[start_index:]):
        transaction_metaInformation = get_transaction_information(block_data, transaction_hash) 
        # process the transaction
        try :
            val = processing_individual_transaction(transaction_hash, block_number, index, transaction_metaInformation)
            print(val)
        except ValueError as e:
            # retry transactions from the failed transaction's indexbit
            val = process_block_based_transaction_job.retry(countdown=60, exc=e, kwargs={'transaction_hashes': transaction_hashes, 'block_number': block_number, 'start_index': index})
            print(val)
        
    #  After we exit from the for loop we tell the ingestion that the block has been processed
    update_latest_ingestion_block(db, block_number)
    return f"All Transactions processed for block number {block_number}"


# Routes
@app.route('/')
def home():
    block_id = fetch_latest_block_number_api()
    # update_latest_ingestion_block(db, block_id - 11)
    return jsonify({"message": block_id})

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


@app.route('/api/transactions-list', methods=['POST'])
def get_transactions():
    index = request.json['index']
    print(index, " bhai")

    # TODO: Reevaluate this logic
    # User asks for xth - xth + default_list transactions
    # get blocks list from latest to earlist
    # each block has list of txns as well as length of all txns
    # current_length_reached = 0
    # current_block = latest_block
    # loop
    # get block data { only the block number and transactions_length }
    # if current_length_reached + transactions_length < x
    # current_length += transactions_length
    # else if current_length_reached + transactions_length (length) == x (index)
    # this eg means : I have 20 txns and i am asking for 21st txn
    # so return default_list many txns from next block
    # else (when current_length_reached + transactions_length > x):
    # return default_list many txns from current block starting from x - current_length_reached index to default_list of this block
    x = index
    default_list = 10
    blocks = []
    current_length_reached = 0
    
    current_block = fetch_latest_ingested_block(db)
    while True:
        block_data = fetch_block(db, current_block)
        blocks.append(block_data)
        current_length_reached += block_data['transactions_length']
        if current_length_reached < x:
            current_block -= 1
        elif current_length_reached == x:
            break
        else:
            break

    # get the transactions from the current block
    current_block_data = blocks[-1]
    transactions = current_block_data['transactions']

    # x = 0
    # current_length_reached = 217
    # default_list = 10
    # start index -> 0, got -217
    # end index -> 10, got -207

    start_index = min(abs(x - current_length_reached), x)
    end_index = min(abs(x - current_length_reached) + default_list, x + default_list)

    transactions = transactions[start_index:end_index]
    return jsonify({
        "message": "Transactions fetched successfully",
        "block_number": current_block_data["_id"],
        "start_index": start_index,
        "end_index": end_index,
        "data": transactions,
    })

# Fetch transaction data for a given transaction hash
@app.route('/api/fetch-transaction-data/<string:transaction_hash>', methods=['GET'])
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
