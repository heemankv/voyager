




def get_unique_block_numbers(transactions):
    # Extract unique block numbers from transactions
    block_numbers = set(tx['block_number'] for tx in transactions)
    return block_numbers
