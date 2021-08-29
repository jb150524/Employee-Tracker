const mysql = require('mysql');
const inquirer = require('inquirer')

var connection = mysql.createConnection({
    multipleStatements
});