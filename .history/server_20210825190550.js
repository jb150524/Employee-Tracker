const mysql = require('mysql');
const inquirer = require('inquirer')

var connection = mysql.createConnection({
    multipleStatements: true,
    host: 'localhost',

    port: 3001,
    user: 'root',
    password: 
});