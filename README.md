# Node.js PostgreSQL CRUD example with Express Rest APIs


required .env with values
```
HOST=
USER=postgres
PASSWORD=
DB=testdb
DIALECT=postgres
POOL_MAX=5
POOL_MIN=0
POOL_ACQUIRE=30000
POOL_IDLE=10000
```

required .env with values for localhost
```
HOST=localhost
USER=postgres
PASSWORD=123
DB=testdb
DIALECT=postgres
POOL_MAX=5
POOL_MIN=0
POOL_ACQUIRE=30000
POOL_IDLE=10000
```

We will build Rest Apis that can create, retrieve, update, delete and find Tutorials by title.

The following table shows overview of the Rest APIs that will be exported:

- GET     `api/tutorials`	            get all Tutorials
- GET     `api/tutorials/:id`         get Tutorial by id
- POST    `api/tutorials`             add new Tutorial
- PUT     `api/tutorials/:id`         update Tutorial by id
- DELETE  `api/tutorials/:id`         remove Tutorial by id
- DELETE  `api/tutorials`             remove all Tutorials
- GET     `api/tutorials/published`   find all published Tutorials
- GET     `api/tutorials?title=[kw]`  find all Tutorials which title contains 'kw'

Create a new Tutorial using `POST /tutorials` Api. Make sure to select BODY>RAW>JSON

![node-js-postgresql-crud-example-create](https://dev-to-uploads.s3.amazonaws.com/i/hqvz8ra9p21z927iwzph.png)

After creating some new Tutorials, you can check PostgreSQL table:
```testdb=# select * from tutorials;
 id |    title    |    description    | published |         createdAt          |         updatedAt
----+-------------+-------------------+-----------+----------------------------+----------------------------
  1 | Node Tut #1 | Tut#1 Description | f         | 2020-01-29 10:42:57.121+07 | 2020-01-29 10:42:57.121+07
  2 | Node Tut #2 | Tut#2 Description | f         | 2020-01-29 10:43:05.131+07 | 2020-01-29 10:43:05.131+07
  3 | Node Tut #3 | Tut#3 Description | f         | 2020-01-29 10:43:48.028+07 | 2020-01-29 10:43:48.028+07
  4 | Js Tut #4   | Tut#4 Desc        | f         | 2020-01-29 10:45:40.016+07 | 2020-01-29 10:45:40.016+07
  5 | Js Tut #5   | Tut#5 Desc        | f         | 2020-01-29 10:45:44.289+07 | 2020-01-29 10:45:44.289+07
```

- Retrieve all Tutorials using `GET /tutorials` Api

![node-js-postgresql-crud-example-retrieve-all](https://dev-to-uploads.s3.amazonaws.com/i/m9razjm1njgww58er3as.png)

- Retrieve a single Tutorial by id using `GET /tutorials/:id` Api

![node-js-postgresql-crud-example-retrieve-one](https://dev-to-uploads.s3.amazonaws.com/i/0kuojvc596i5u423od2b.png)

- Update a Tutorial using `PUT /tutorials/:id` Api

![node-js-postgresql-crud-example-update](https://dev-to-uploads.s3.amazonaws.com/i/3buqfz0by0lu2z4kf3uq.png)

Check `tutorials` table after some rows were updated:
```testdb=# select * from tutorials;
 id |     title      |    description    | published |         createdAt          |         updatedAt
----+----------------+-------------------+-----------+----------------------------+----------------------------
  1 | Node Tut #1    | Tut#1 Description | f         | 2020-01-29 10:42:57.121+07 | 2020-01-29 10:42:57.121+07
  3 | Node Tut #3    | Tut#3 Description | f         | 2020-01-29 10:43:48.028+07 | 2020-01-29 10:43:48.028+07
  2 | Node Js Tut #2 | Tut#2 Description | t         | 2020-01-29 10:43:05.131+07 | 2020-01-29 10:51:55.235+07
  4 | Js Tut #4      | Tut#4 Desc        | t         | 2020-01-29 10:45:40.016+07 | 2020-01-29 10:54:17.468+07
  5 | Js Tut #5      | Tut#5 Desc        | t         | 2020-01-29 10:45:44.289+07 | 2020-01-29 10:54:20.544+07
```

- Find all Tutorials which title contains 'js': `GET /tutorials?title=js`

![node-js-postgresql-crud-example-search](https://dev-to-uploads.s3.amazonaws.com/i/u2hbmz5r35o7uo09y3z5.png)

- Find all published Tutorials using `GET /tutorials/published` Api

![node-js-postgresql-crud-example-search-status](https://dev-to-uploads.s3.amazonaws.com/i/dbo753wfqibt0b93d82d.png)

- Delete a Tutorial using `DELETE /tutorials/:id` Api

![node-js-postgresql-crud-example-delete-one](https://dev-to-uploads.s3.amazonaws.com/i/pyos3wq4tchb8ixuyj1c.png)

Tutorial with id=4 was removed from `tutorials` table:
```testdb=# select * from tutorials;
 id |     title      |    description    | published |         createdAt          |         updatedAt
----+----------------+-------------------+-----------+----------------------------+----------------------------
  1 | Node Tut #1    | Tut#1 Description | f         | 2020-01-29 10:42:57.121+07 | 2020-01-29 10:42:57.121+07
  3 | Node Tut #3    | Tut#3 Description | f         | 2020-01-29 10:43:48.028+07 | 2020-01-29 10:43:48.028+07
  2 | Node Js Tut #2 | Tut#2 Description | t         | 2020-01-29 10:43:05.131+07 | 2020-01-29 10:51:55.235+07
  5 | Js Tut #5      | Tut#5 Desc        | t         | 2020-01-29 10:45:44.289+07 | 2020-01-29 10:54:20.544+07
```

- Delete all Tutorials using `DELETE /tutorials` Api

![node-js-postgresql-crud-example-delete-all](https://dev-to-uploads.s3.amazonaws.com/i/ga42747jorssl20ywyug.png)

Now there are no rows in `tutorials` table:
```testdb=# select * from tutorials;
 id | title | description | published | createdAt | updatedAt
----+-------+-------------+-----------+-----------+-----------
```

## Project setup
```
npm install
```

### Run
```
node server.js
```
