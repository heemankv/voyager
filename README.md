# Hey There ! This is Voyager's Basic Clone !
Developed by Heemank Verma
[ 21st, 23rd June 2024 ]

Key Features : 
- Backend automatically ingestes new blocks, and is readily fetchable.
- Backend is Dockerized, to keep it easily replicable.
- Frontend is TypeSafe, and built with NextJs App Router setup.
- Frontend uses React-Query to fetch and store states better.
- [First time] Used *CodeRabbit* to get my PRs reviews.
- CodeLife well commited on github.
- TODOs workflow.

# Using the Backend :

```
// .env
export MONGO_URI=
export DATABASE_NAME=
export CELERY_BROKER_URL=redis://redis:6379/0
export CELERY_RESULT_BACKEND=redis://redis:6379/0
export JOB_DELAY_SECONDS=4
export BLAST_ID=
```

# mongoDb cluster :
eg : 
- Database Name :  blockChainDatabase
- Collection 1 : blocks (stores information specicic to blocks) (1 document = 1 block, multi docs)
- Collection 2 : transactions (stores information of transactions) (1 document = 1 transaction, multi docs)
- Collection 3 : ingestion (stores latest completely ingested block) (only 1 document ever)

PreRequsites : 
- docker
- python3
- redis
- (unix/linux) system (havn't checked on windows)
- Mongodb database setup

Commands : 
` docker-compose build  `
` docker-compose up `


# Using the Frontend :

PreRequsites : 
- nodejs@latest
- npm@latest
- (unix/linux) system (havn't checked on windows)


Commands : 
` npm install   `
` npm run dev `


# Video of Transactions List page :
https://github.com/heemankv/voyager/assets/76938871/f7bf249a-538d-42b6-b2c2-07c2ade092d9

# Video of Individual Transaction Details page : 
https://github.com/heemankv/voyager/assets/76938871/151116c0-a72e-43d7-9006-06eaf4c3b046


Perks : 
- Smooth Filtering 
- Robust Ingestion (supports continuity)
- TypeSafe Frontend
- Error Handling Backend

Caveates :
- CallData view : Not Implemented
- Deleting old block from mongoDB : Not Implemented
- TODOs left to rework
- Styling not 100% exact as of Voyager
