import os
from pymongo import MongoClient

from backend.helpers.getEnv import getDatabaseName, getMongoUri


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
    block_id = block_data['block_number']
    db.blocks.update_one({"_id": block_id}, {"$set": block_data}, upsert=True)

# Function to insert a transaction into MongoDB
def insert_transaction(db, transaction_data):
    transaction_hash = transaction_data['_id']
    db.transactions.update_one({"_id": transaction_hash}, {"$set": transaction_data}, upsert=True)