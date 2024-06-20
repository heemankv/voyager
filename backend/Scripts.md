# To run the env,

`source bin/activate`

# To dump all the requirements to a file,

`pip freeze > requirements.txt`

# MongoDb : Cluster -> Database -> Collection -> Document

# To run redis & celery & flower:

`redis-server`
`celery -A app.celery worker --loglevel=info`
`celery -A app.celery beat --loglevel=info`
`flower -A tasks --port=5555`

# To shut down the redis server:

`redis-cli shutdown`
