import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'user2',
  password: '123',
  database: 'luckynumber',
});

export default pool;