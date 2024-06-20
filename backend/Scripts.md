# To run the env,

`source bin/activate`

# To dump all the requirements to a file,

`pip freeze > requirements.txt`

# MongoDb : Cluster -> Database -> Collection -> Document

# To run redis & celery & flower:

`redis-server`
`celery -A app.celery worker --loglevel=info`
`celery -A app.celery beat --loglevel=info`
`celery flower -A app.celery --address=127.0.0.1  --port=5555`
`python3 app.py`

# To shut down the redis server:

`redis-cli flushall`
`redis-cli shutdown`
