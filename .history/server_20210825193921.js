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
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add an Employee',
            'Update Employee Role',
            'EXIT'
        ]
    })
.then(function(answer) {
    if (answer.action === 'View all Departments') {
        viewDepartments();
} else if (answer.action === 'View all Roles') {
    viewRoles();
} else if (answer.action === 'View all Employees') {
    viewEmployees();
} else if (answer.action === 'Add Department') {
    addDepartment();
} else if (answer.action === 'Add Role') {
    addRole();
} else if (answer.action === 'Add an Employee') {
    addEmployee();
} else if (answer.action === 'Add Employee Role') {
    updateRole();
} else if (answer.action === 'EXIT') {
    connection.end();
    }
})
}

function viewDepartment() {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err. res) {
    console.log(`DEPARTMENTS:`)
    console.log(`ID:                        Name: `)
    console.log('=========================')
    res.forEach(Department => {
        console.log(` ${Department.id}                  ${Department.name}`)
        console.log('----               ----------')
    })
    start();
    });
};
function viewRoles() {
    var query ='SELECT * FROM Role';
    connection.query(query, function(err, res) {
        console.log(`ROLES:`)
        console.log('=========================')
            res.forEach(Role => {
            console.log(`ID: ${Role.id} |  Title: ${Role.title} |  Salary: ${Role.salary} |  Department ID: ${Role.Department_id}`);
            console.log('----               ----------')
})
    start();
    )