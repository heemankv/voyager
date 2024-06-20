# Define schemas
from typing import List


transaction_metadata_schema = {
  "transaction_hash": str,
    "type": str,
    "version": str,
    "nonce": str,
    "max_fee": str,
    "sender_address": str,
    "signature": [str],
    "calldata": [str]
}


# TODO: merge the schemas to not define it again in the schema.py file

blocks_schema_api = {
    "status" : str,
    "block_hash": str,
    "parent_hash": str,
    "new_root": str,
    "timestamp": int,
    "sequencer_address": str,
    "l1_gas_price": {
        "price_in_fri": str,
        "price_in_wei": str
    },
    "l1_data_gas_price": {
        "price_in_fri": str,
        "price_in_wei": str
    },
    "l1_da_mode": str,
    "starknet_version": str,
    "transactions": [transaction_metadata_schema],
}


transactions_schema_api = {
    "type": str,
    "version": str,
    "nonce": str,
    "max_fee": str,
    "sender_address": str,
    "signature": [str],
    "calldata": [str],
    "block_hash": str,
    "actual_fee": {
        "amount": str,
        "unit": str
    },
    "execution_status": str,
    "finality_status": str,
    "block_number": int,
    "messages_sent": [str],
    "events": [
        {
            "from_address": str,
            "keys": [str],
            "data": [str]
        }
    ],
    "execution_resources": {
        "steps": int,
        "pedersen_builtin_applications": int,
        "range_check_builtin_applications": int,
        "ec_op_builtin_applications": int,
        "data_availability": {
            "l1_gas": int,
            "l1_data_gas": int
        }
    }
}


blocks_schema = {
    "_id": int,
    "status" : str,
    "block_hash": str,
    "parent_hash": str,
    "new_root": str,
    "timestamp": int,
    "sequencer_address": str,
    "l1_gas_price": {
        "price_in_fri": str,
        "price_in_wei": str
    },
    "l1_data_gas_price": {
        "price_in_fri": str,
        "price_in_wei": str
    },
    "l1_da_mode": str,
    "starknet_version": str,
    "transactions": [transaction_metadata_schema],
}

transactions_schema = {
    "_id": str,
    "type": str,
    "version": str,
    "nonce": str,
    "max_fee": str,
    "sender_address": str,
    "signature": [str],
    "calldata": [str],
    "block_hash": str,
    "actual_fee": {
        "amount": str,
        "unit": str
    },
    "execution_status": str,
    "finality_status": str,
    "block_number": int,
    "messages_sent": [str],
    "events": [
        {
            "from_address": str,
            "keys": [str],
            "data": [str]
        }
    ],
    "execution_resources": {
        "steps": int,
        "pedersen_builtin_applications": int,
        "range_check_builtin_applications": int,
        "ec_op_builtin_applications": int,
        "data_availability": {
            "l1_gas": int,
            "l1_data_gas": int
        }
    }
}
