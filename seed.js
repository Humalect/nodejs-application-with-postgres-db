const { Client } = require('pg');

const connectionString = 'postgresql://me:password@localhost:5432/api';

const client = new Client({ connectionString });
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
