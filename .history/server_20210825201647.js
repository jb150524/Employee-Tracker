const mysql = require('mysql');
const inquirer = require('inquirer');
const { connect } = require('http2');

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
    });
};

function addDepartment() {
    inquirer
        .prompt({
            name: 'Department',
            type: 'Input',
            message: 'What is the name of the New Department?',
        })
        .then(function(answer) {
            var query = 'INSERT INTO Deparment (name) VALUES (?)';
            connection.query(query, answer.Department, function(err, res) {
                console.log(`You have added this Department: ${(answer.Department).toUpperCase()}.`)
            })
            viewDepartments();
        })
    }
    function addRole() {
        connection.query(`SELECT * FROM Department`, function(err, res) {
            if (err) throw (err);
            inquirer
            .prompt([{
                name: 'title',
                type: 'input',
                message: 'What is the Title of the New Role?',
        },
        {
                name: 'salary',
                type: 'input',
                message: 'What is the Salary of the New Role?',
        },
        {
                name: 'DepartmentName',
                type: 'list',
                message: 'Which Department does this Role fall under?',
                choices: function() {
                    var choicesArray = [];
                    res.forEach(res => {
                        choicesArray.push(
                            res.name
                        );
                    })
                    return choicesArray;;
                }
            }
            ])
            .then(function(answer) {
                const department = answer.departmentName;
                connection.query(`SELECT * FROM DEPARTMENT`. function(err, res) {

                    if(err) throw (err);
                    let filteredDept = res.filter(function(res) {
                        return res.name == department;
                    }
                    )
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
        connection.query('SELECT * FROM role', function(err. result) {
            if (err) throw (err);
            inquirer
            .prompt([{
                name: 'firstName',
                type: 'input',
                message: 'What is the employee's first name?',
            },
            {
                name: 'roleName',
                type: 'input',
                message: 'WHat is the employee's first name?',   
        })
    }
        
