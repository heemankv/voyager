There is a possibility that we just might have to maintain the last 10 blocks of data
So there can be 4 jobs :

# NOTE : Currently I am asking Transaction ingestion's dependence on Block ingestion,

# but this is createling lots of dependence, can be reworked to make them independent

I need the system to only have the last 10 blocks of data,
There are few calls here :

1. Get the current block number & data for that block in 1 cron job, whatever list of transactions we get here, send them to be processed in the next job (2nd job)
2. Use the transaction hash given as param to these job to fetch the transaction data and store it in the database
   automatically delete the block data and transactions which are older than 10 blocks
3. Get the current block number & then subtract it by 11 to get teh block number for which we need to delete the data, first fetch from the database all the transactions that this block is associalted with and then trigger delete trnasaction job for each transaction and then delete the block data
4. Delete the transaction data from the database
