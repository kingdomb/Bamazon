require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');
const config = require('./config');

var connection = mysql.createConnection({
    host: config.db_host,
    port: config.db_port,
    user: config.db_user,
    password: config.db_password,
    database: config.db_name
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    //connection.end();
  });

  // console.table();
connection.query('SELECT * FROM inventory', (err, data)=>{
  if (err) throw err;
  console.table(data);
});
  