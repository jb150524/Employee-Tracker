const mysql = require('mysql');
const inquirer = require('inquirer')

var connection = mysql.createConnection({
    multipleStatements: true,
    host: 'localhost',

    port: 3001,
    user: 'root',
    password: 'rootr00t!',
    database: 'employee_db'
});

connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
    .prompt(({
        name: 'action',
        type: 'list',
        message: 'What do you want to do?',
        choices: [
            'View All Deparments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add an Employee',
            'Add an Employee',
        ]
    }
}