const Pool = require('pg').Pool
require('dotenv').config();


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
console.log("pool", pool, process.env.DB_USER);

// Function to create the users table if it doesn't exist
async function createUsersTable() {
  const client = await pool.connect();
  try {
    // Check if the users table exists
    const checkTableQuery = `
      SELECT EXISTS (
        SELECT 1
        FROM   information_schema.tables 
        WHERE  table_name = 'users'
      );
    `;
    const { rows } = await client.query(checkTableQuery);
    const tableExists = rows[0].exists;

    // If the table doesn't exist, create it
    if (!tableExists) {
      const createTableQuery = `
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL
        );
      `;
      await client.query(createTableQuery);
      console.log('Users table created successfully.');
    } else {
      console.log('Users table already exists.');
    }
  } catch (error) {
    console.error('Error creating users table:', error);
  } finally {
    client.release();
  }
}

createUsersTable();

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

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    console.log("results", results);
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
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
    console.log(":request", request);
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