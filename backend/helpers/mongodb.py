import os
from pymongo import MongoClient

from helpers.getEnv import getDatabaseName, getMongoUri

def connectMongoDB():
  MONGO_URI = getMongoUri()
  DATABASE_NAME = getDatabaseName()
  if not MONGO_URI or not DATABASE_NAME:
      raise ValueError("Please set MONGO_URI and DATABASE_NAME environment variables")

  # Set up MongoDB client
  client = MongoClient(MONGO_URI)
  db = client[DATABASE_NAME]

  return client, db


# Function to insert a block into MongoDB
def insert_block(db, block_data):
    # validate that the connection is live
    if not db.client:
        db.client = MongoClient(getMongoUri())
    block_id = block_data['block_number']
    db.blocks.update_one({"_id": block_id}, {"$set": block_data}, upsert=True)

# Function to insert a transaction into MongoDB
# // define this to be an ÷async function]
def insert_transaction(db, transaction_data):
    # validate that the connection is live
    if not db.client:
        db.client = MongoClient(getMongoUri())
    transaction_hash = transaction_data['transaction_hash']
    db.transactions.update_one({"_id": transaction_hash}, {"$set": transaction_data}, upsert=True)



# ingested collection will only have one document with _id as "latest"
# this document will have the latest block number that has been ingested
# TODO: handle failure
def fetch_ingestion_block(db):
    if not db.client:
        db.client = MongoClient(getMongoUri())

    ingestion_block = db.ingestion.find_one({"_id": "latest"})
    # return the block number
    return ingestion_block.get("block_number", 0) if ingestion_block else None


def update_latest_ingestion_block(db, block_number):
    if not db.client:
        db.client = MongoClient(getMongoUri())
    
    db.ingestion.update_one({"_id": "latest"}, {"$set": {"block_number": block_number}}, upsert=True)


def fetch_block(db, block_number):
    if not db.client:
        db.client = MongoClient(getMongoUri())

    block_data = db.blocks.find_one({"_id": block_number})
    return block_data
        
def fetch_transaction(db, transaction_hash):
    if not db.client:
        db.client = MongoClient(getMongoUri())

    transaction_data = db.transactions.find_one({"_id": transaction_hash})
    return transaction_data