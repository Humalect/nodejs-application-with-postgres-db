const Pool = require('pg').Pool

require('dotenv').config()

console.log({user:process.env.POSTGRES_USER});

console.log({passwprd:process.env.POSTGRES_PASSWORD});

console.log({host:process.env.HOST});

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.HOST,
  database: 'api',
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
})


const { Client } = require('pg');

const connectionString = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.HOST}:5432/api`;

console.log({connectionString});


const client = new Client({ connectionString });


  
(async () => {  
  try {  
client.connect();

client.query('CREATE ROLE me WITH LOGIN PASSWORD \'password\';', (err, res) => {
  if (err) throw err;
  console.log('Role created successfully');
});

client.query('ALTER ROLE me CREATEDB;', (err, res) => {
  if (err) throw err;
  console.log('Role updated successfully');
});

client.query('CREATE DATABASE api;', (err, res) => {
  if (err) throw err;
  console.log('Database created successfully');
});

client.query(`CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30)
);`, (err, res) => {
  if (err) throw err;
  console.log('Table created successfully');
});

client.query(`INSERT INTO users (name, email)
  VALUES ('Jerry', 'jerry@example.com'), ('George', 'george@example.com');`, (err, res) => {
  if (err) throw err;
  console.log('Data inserted successfully');
});

client.end();



const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createUser = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
  }

  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }


  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }
} catch (err) {  
  console.error(err);  
} finally {  
  await client.end();  
}  
})();  

