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
                }
                message: 'What is this Employees Role?'
                
            ])
            .then(function(answer) {
                const department = answer.departmentName;
                connection.query('SELECT * FROM DEPARTMENT', function(err, res) {

                    if(err) throw (err);
                    let filteredDept = res.filter(function(res) {
                        return res.name == department;
                    })
                    let id = filteredDept[0].id;
                    let query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
                    let values = [answer.title, parseInt(answer.salary), id]
                    console.log(values);
                    connection.query(query, values, function(err, res, fields) {
                        console.log(`You have added this role: ${(values[0]).toUpperCase()}.`)
                    })
                    viewRoles()
                })
            })
        })
    }

    async function addEmployee(){
        connection.query('SELECT * FROM role', function(err, result) {
            if (err) throw (err);
            inquirer
            .prompt([{
                name: 'firstName',
                type: 'input',
                message: 'What is the employees first name?',
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is the employees last name?',
            },
            {
                name: 'roleName',
                type: 'list',
                message: 'What Role does the employee have?',
                choices: function() {
                    rolesArray = [];
                    result.forEach(result => {
                        rolesArray.push(
                            result.title
                        );
                    })
                    return rolesArray;
                }
                }
            ])
        .then(function(answer) {
            console.log(answer);
            const role = answer.roleName;
            connection.query('SELECT * FROM role', function(err, res) {
                if (err) throw (err);
                let filteredRole = res.filter(function(res) {
                    return res.title == role;
                })
                let roleId = filteredRole[0].id;
                connection.query('SELECT * FROM employee', function(err, res) {
                    inquirer
                    .prompt([
                        {
                            name: 'Manager',
                            type: 'list',
                            message: 'Who is your Manager?',
                            choices: function() {
                                managersArray = []
                                res.forEach(res => {
                                    managersArray.push(
                                        res.last_name)
                                })
                                return managersArray;
                                }
                            }
                    ])
                    .then(function(managerAnswer) {
                        const manager = managerAnswer.manager;
                        connection.query('SELECT * FROM employee', function(err, res) {
                            if (err) throw (err);
                            let filteredManager = res.filter(function(res) {
                                return res.last_name == manager;
                            })
                            let managerId = filteredManager[0].id;
                            console.log(managerAnswer);
                            let query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
                            let values = [answer.firstName, answer.lastName, roleId, managerId]
                            console.log(values);
                            connection.query(query, values,
                                function(err, res, fields){
                                    console.log(`You have added this employee: ${(values[0].toUpperCase())}.`)
                                })
                                viewEmployees();
                                })
                            })
                        })
                    })          
                })          
            })  
        }         
function updateRole() {
    connection.query('SELECT * FROM employee', function(err, result) {
        if (err) throw (err);
        inquirer
        .prompt([{
                name: 'employeeName',
                type: 'list',
                message: 'Which employees role is changing?',
                choices: function() {
                    employeeArray = [];
                    result.forEach(result => {
                        employeeArray.push(
                            result.last_name
                        );
                    })
                    return employeeArray;
                }
            }
        ])
        .then(function(answer) {
            console.log(answer);
            const name = answer.employeeArray;
            connection.query('SELECT * FROM role', function(err, res) {
                inquirer
                .prompt ([
                    {
                        name: 'Role',
                        type: 'list',
                        message: 'What is their New Role?',
                        choices: function() {
                            rolesArray = [];
                            res.forEach(res => {
                                rolesArray.push(
                                    res.title)
                            })
                            return rolesArray;
                        }
                    }
                ])
                .then(function(rolesAnswer) {
                    const role = rolesAnswer.role;
                    console.log(rolesAnswer.role);
                    connection.query('DELECT * FROM role WHERE title = ?', [roles], function(err, res) {
                        if (err) throw (err);
                        let roleId = res.id;
                        let query = 'UPDATE employee SET role_id ? WHERE last_name ?';
                        let values = [roleId, name]
                        console.log(values);
                        connection.query(query, values,
                            function(err, res, fields) {
                                console.log(`You have updated ${name}'s role to ${role}.`)
                            })
                            viewEmployees();
                    })
                })
            })
        })
    })
}