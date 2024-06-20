# celeryconfig.py

# Redis configuration
broker_url = 'redis://localhost:6379/0'
result_backend = 'redis://localhost:6379/0'

# Define the schedule for periodic tasks (cron jobs)
from celery.schedules import crontab

beat_schedule = {
    'fetch-current-block-data': {
        'task': 'tasks.fetch_current_block_data',
        'schedule': crontab(minute='*/5'),  # Run every 5 minutes
    },
    'delete-old-block-data': {
        'task': 'tasks.delete_old_block_data',
        'schedule': crontab(minute='*/30'),  # Run every 30 minutes
    },
}
