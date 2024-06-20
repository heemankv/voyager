import requests

from helpers.validate_schema import validate_blocks_data_api, validate_transaction_data_api

# TODO: turn on validation for the block data and transaction data

url = "https://free-rpc.nethermind.io/mainnet-juno"

def fetch_latest_block_number_api():
    payload = {
        "jsonrpc": "2.0",
        "method": "starknet_blockNumber",
        "params": [],
        "id": 1
    }
    headers = {"Content-Type": "application/json"}
    response = requests.request("POST", url, json=payload, headers=headers)
    response = response.json()
    if 'error' in response:
        raise ValueError(response['error']['message'])
    elif 'result' not in response:
        raise ValueError("Invalid response from RPC server")
    elif type(response['result']) != int:
        raise ValueError("Invalid response from RPC server")
    
    return response['result']

def fetch_block_data_api(block_number):
    payload = {
        "jsonrpc": "2.0",
        "method": "starknet_getBlockWithTxs",
        "params": [{"block_number": block_number}],
        "id": 1
    }
    headers = {"Content-Type": "application/json"}
    response = requests.request("POST", url, json=payload, headers=headers)
    response = response.json()
    if 'error' in response:
        raise ValueError(response['error']['message'])
    elif 'result' not in response:
        raise ValueError("Invalid response from RPC server")
    
    block_data = response['result']
    # validate_blocks_data_api(block_data)

    return block_data

def fetch_transaction_data_api(transaction_hash):
    payload = {
        "jsonrpc": "2.0",
        "method": "starknet_getTransactionReceipt",
        "params": [transaction_hash],
        "id": 1
    }
    headers = {"Content-Type": "application/json"}
    response = requests.request("POST", url, json=payload, headers=headers)
    response = response.json()
    if 'error' in response:
        raise ValueError(response['error']['message'])
    elif 'result' not in response:
        raise ValueError("Invalid response from RPC server")
    
    transaction_data = response['result']
    # validate_transaction_data_api(transaction_data)  # Validate the structure of transaction_data
    
    return transaction_data
