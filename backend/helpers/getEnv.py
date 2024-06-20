import os

def getCeleryBrokerUrl():
    url =  os.getenv('CELERY_BROKER_URL')
    if url is None:
        raise ValueError("Please set CELERY_BROKER_URL environment variable")
    
def getMongoUri():
    url =  os.getenv('MONGO_URI')
    if url is None:
        raise ValueError("Please set MONGO_URI environment variable")
    
def getDatabaseName():
    name =  os.getenv('DATABASE_NAME')
    if name is None:
        raise ValueError("Please set DATABASE_NAME environment variable")