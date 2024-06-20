# tasks.py
from celery import Celery
from pymongo import MongoClient
from backend.helpers.apis import *
from backend.helpers.getEnv import getCeleryBrokerUrl
from helpers.mongodb import connectMongoDB, insert_block
import os

app = Celery('tasks', broker=getCeleryBrokerUrl())

client, db = connectMongoDB()

# Task to fetch current block data and process transactions
@app.task
def fetch_block_data(block_number=None):
    # if parameter block_number is provided, fetch block data for that block number
    # else fetch block data for the latest block number
    if block_number is None:
        block_number = fetch_latest_block_number_api()

    # After getting the block number, fetch block data
    block_data = fetch_block_data_api(block_number)

    # Insert block data into MongoDB
    insert_block(db, block_data)

    # Trigger task to process transactions
    for transaction_hash in block_data.get('transactions', []):
        process_transaction.delay(transaction_hash)




# Task to process individual transaction data
@app.task
def process_transaction(transaction_hash):
    # Code to fetch transaction details
    # Mock implementation for demonstration
    transaction_data = {"_id": transaction_hash, "data": "Transaction details"}  # Replace with actual fetching logic

    # Insert transaction into MongoDB
    db.transactions.update_one({"_id": transaction_hash}, {"$set": transaction_data}, upsert=True)

# Task to delete old block data and associated transactions
@app.task
def delete_old_block_data():
    # Fetch block number to delete (current_block_number - 11)
    current_block_number = 650827  # Replace with actual code to fetch current block number
    block_number_to_delete = current_block_number - 11

    # Fetch transactions associated with block_number_to_delete
    transactions_to_delete = db.blocks.find_one({"_id": block_number_to_delete}).get('transactions', [])

    # Trigger task to delete transactions
    for transaction_hash in transactions_to_delete:
        delete_transaction.delay(transaction_hash)

    # Delete block data
    db.blocks.delete_one({"_id": block_number_to_delete})

# Task to delete transaction data
@app.task
def delete_transaction(transaction_hash):
    db.transactions.delete_one({"_id": transaction_hash})
