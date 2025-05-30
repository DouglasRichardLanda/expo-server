import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'youruser',
  password: 'yourpass',
  database: 'yourdb',
});

export default pool;