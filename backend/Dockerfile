# Use the official Python image from the Docker Hub
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5001

# Define environment variable
ENV NAME MONGO_URI
ENV NAME DATABASE_NAME
ENV NAME CELERY_BROKER_URL
ENV NAME CELERY_RESULT_BACKEND
ENV NAME JOB_DELAY_SECONDS
ENV NAME BLAST_ID

# Run app.py when the container launches

CMD ["python3", "app.py"]
