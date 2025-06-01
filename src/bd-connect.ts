import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'user2',
  password: '123',
  database: 'luckynumber',
});

export default pool;

/*
*   TO ADDRESS THE DB, WE USE THIS ABOVE-MENTIONED POOL
*
* 1. Direct SQL query:
* const [row] = await pool.query(
*   'select * from users where = ?',
*   [var1]
* );
* In this case, all ? will be replaced with variables given in an array next, in the right order
* */