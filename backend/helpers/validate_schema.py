from helpers.schema import blocks_schema_api, transactions_schema_api, transaction_metadata_schema


# Validate function for block data
def validate_blocks_data_api(block_data):
    for key, expected_type in blocks_schema_api.items():
        if key not in block_data:
            raise ValueError(f"Key '{key}' not found in block data")
        if not isinstance(block_data[key], expected_type):
            raise ValueError(f"Value for '{key}' has unexpected type: expected {expected_type}, got {type(block_data[key])}")


# Validate function for transaction data
def validate_transaction_data_api(transaction_data):
    for key, expected_type in transactions_schema_api.items():
        if key not in transaction_data:
            raise ValueError(f"Key '{key}' not found in transaction data")
        if not isinstance(transaction_data[key], expected_type):
            raise ValueError(f"Value for '{key}' has unexpected type: expected {expected_type}, got {type(transaction_data[key])}")
