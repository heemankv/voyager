import os
from dotenv import load_dotenv
load_dotenv()

def getCeleryBrokerUrl():
    url =  os.getenv('CELERY_BROKER_URL')
    if url is None:
        raise ValueError("Please set CELERY_BROKER_URL environment variable")
    return url

def getCeleryResultBackend():
    url =  os.getenv('CELERY_RESULT_BACKEND')
    if url is None:
        raise ValueError("Please set CELERY_RESULT_BACKEND environment variable")
    return url

def getMongoUri():
    url =  os.getenv('MONGO_URI')
    if url is None:
        raise ValueError("Please set MONGO_URI environment variable")
    return url
    
def getDatabaseName():
    name =  os.getenv('DATABASE_NAME')
    if name is None:
        raise ValueError("Please set DATABASE_NAME environment variable")
    return name