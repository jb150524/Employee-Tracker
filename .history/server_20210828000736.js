const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table')

const connection = mysql.createConnection({
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
        message: 'Welcome to our employee database! What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add an Employee',
            'Update Employee Role',
            'Delete an employee',
            'EXIT'
             ]
    }).then(function (answer) {
        switch (answer.action) {
        case 'View all Employees':
            viewEmployees();
            break;
        case 'View all Departments':
            viewDepartments();
            break;
        case 'View all Roles':
            viewRoles();
            break;
        case 'Add an Employee':
            addEmployee();
            break;
        case 'Add a Department':
            addDepartment();
            break;
        case 'Add a Role':
            addRole();
            break;
        case 'Update Employee Role':
            updateRoles();
            break;
        case 'Delete an Employee':
            deleteEmployee();
            break;
        case 'EXIT':
            exitApp();
            break;
            default:
            break;
        }
    })
};

function viewEmployees() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + ` employees found!`);
        console.table('All employees:', res);
        start();
    })
};

// view all departments in the Database //
function viewDepartments() {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table('All Departments:', res);
        start();
    })
};

// view all Roles in the Database //
function viewRoles() {
    var query = 'SELECT * FROM role';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table('All Roles:', res);
        start();
    })
};

// Add an employee to the Database //
function addEmployee() {
        connection.query('SELECT * FROM role', function(err, res) {
            if (err) throw (err);
            inquirer
            .prompt([
        {
                name: 'first_name',
                type: 'input',
                message: 'What is the Employees first name?',
        },
        {
                name: 'last_name',
                type: 'input',
                message: 'What is the Employees last name?',
        },
        {
                name: 'manager_id',
                type: 'list',
                message: 'Wha is the employees managers ID?',
        },
        }
                name: 'role',
                type: 'list',
                choices: function() {
                var roleArray = [];
                for (let i = 0; i < res.length; i++) {
                    roleArray.push(res[i].tile);
                }
                return roleArray;
                },
                message: 'What is this Employees Role?',
        }
        ]).then(function(answer) {
            let role_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].title == answer.role) {
                    role_id = res[a].id;
                    console.log(role_id)
                }
            }
            connection.query(
                'INSERT INTO employee SET ?',
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                manager_id: answer.manager_id,
                role_id: role_id,
            },
            function (err) {
                if (err) throw (err);
                console.log('Your employee has been Added!');
                start();
            })
        })
    })
};

// Add a Department to the DataBase //
function addDepartment() {
    inquirer
    .prompt([
        {
            name: 'newDepartment',
            type: 'input',
            message: 'Which Department would you like to Add?',
        }
    ]).then(function (answer) {
        connection.query(
            'INSERT INTO department SET ?',
            {
                name: answer.newDepartment
            });
        var query = 'SELECT * FROM department';
        connection.query(query, function(err, res){
            if(err) throw (err);
            console.log('Your department has been Added!');
            console.table('All Departments:', res);
            start();
        })
        })
};

// Add Role to the Database //
function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw (err);
        inquirer
        .prompt ([
            {
                name: 'new_role',
                type: 'input',
                message: 'What is the New Role you would like to Add?',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the Salary of this role? (Enter a Number)',
            },
            {
                name: 'Department',
                type: 'list',
                choices: function() {
                    var deptArray =[];
                    for (let i = 0; i < res.length; i++) {
                        deptArray.push(res[i].name);
                    }
                    return deptArray;
                },
            }
        ]).then(function (answer) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
                department_id = res[a].id;
            }
        }
        connection.query(
            'INSERT INTO role SET ?',
            {
                title: answer.new_role,
                salary: answer.salary,
                department_id: department_id
            },
            function (err, res) {
                if(err) throw (err);
                console.log('Your New Role has been Added!');
                console.table('All Roles:', res);
                start();
                })
            })
        })
};

// Update
function updateRole() {
};
function updateRole() {
};
function updateRole() {
};

