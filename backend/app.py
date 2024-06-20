# app.py
from flask import Flask, jsonify

from helpers.mongodb import connectMongoDB

app = Flask(__name__)
client, db = connectMongoDB()


# Routes
@app.route('/')
def home():
    return jsonify({"message": "Hello, World!"})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
