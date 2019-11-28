const mysql = require('mysql');

var pool = mysql.createPool({
    host: process.env.HOSTNAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORTDB,
    database: process.env.database
  });

  global.db = pool;