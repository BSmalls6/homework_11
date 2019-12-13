var mysql = require("mysql");
var inquirer = require("inquirer");
// const DataAccess = require("./functions/DataAccess");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "6starrating",
    database: "companyDB"
});

connection.connect(function (err) {
    if (err) throw err;
    menu();
});

// Gets data from Database
// const dal = new DataAccess(connection);

function menu() {
    inquirer
        .prompt({
            name: "menu",
            type: "list",
            message: "Would you like to do?",
            choices: ["View All Employees", "View Roles", "View Departments", "View All Employees by Department", "View All Employees by Manager", "Add Employee", "Add Department", "Add Role", "Remove Employee", "Update Employee Role", "Update Manager"]
        })
        .then(function (answer) {
            console.log(answer);
            pickRoute(answer);
        });
}

function pickRoute(choice) {
    switch (choice.menu) {
        case "View All Employees":
            viewEmployees();
            break;
        case "View All Employees by Department":
            employeeDepartments();
            break;
        case "View All Employees by Manager":
            employeesbyManager();
            break;
        case "Add Employee":
            addEmployee();
            break;
        case "Remove Employee":
            removeEmployee();
            break;
        case "Update Employee Role":
            updateEmployeerole();
            break;
        case "Update Manager":
            updateManager();
            break;
        case "Add Department":
            addDepartment();
            break;
        case "Add Role":
            addRole();
            break;
        case "View Roles":
            viewRoles();
            break;
        case "View Departments":
            viewDepartments();
    }
}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "employee_firstname",
                type: "input",
                message: "What is the first name of the employee?"
            },
            {
                name: "employee_lastname",
                type: "input",
                message: "What is the last name of the employee?"
            },
            {
                name: "role",
                type: "choice",
                message: "What is the role of the employee?",
                choices: ["1", "2", "3", "4"]
            },
            {
                name: "employee_manager",
                type: "input",
                message: "What is the manager ID of the employee?",
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO employees SET ?",
                {
                    first_name: answer.employee_firstname,
                    last_name: answer.employee_lastname,
                    role_id: answer.role,
                    manager_id: answer.employee_manager,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee Added");
                    menu();
                }
            );
        });
}

function addDepartment() {
    inquirer
        .prompt([
            {
                name: "department_name",
                type: "input",
                message: "What is the department you wish to add?"
            },

        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO departments SET ?",
                {
                    department: answer.department_name,

                },
                function (err) {
                    if (err) throw err;
                    console.log("Department Added");
                    menu();
                }
            );
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                name: "role_name",
                type: "input",
                message: "What is the role you wish to add?"
            },
            {
                name: "role_salary",
                type: "input",
                message: "What is the salary of the role?"
            },
            {
                name: "role_department",
                type: "input",
                message: "What is the department of the role?"
            },

        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO roles SET ?",
                {
                    title: answer.role_name,
                    salary: answer.role_salary,
                    department_id: answer.role_department

                },
                function (err) {
                    if (err) throw err;
                    console.log("Role Added");
                    menu();
                }
            );
        });
}


function employeeDepartments() {
    inquirer
        .prompt({
            name: "department",
            type: "list",
            message: "What department would you like to search?",
            choices: ["Production", "Sales", "HR", "Operations"]
        })
        .then(function (answer) {   
            var query = "select * from employees inner join roles on employees.role_id=roles.id WHERE employees.role_id =?";
            connection.query(query, { department_id: answer.department }, function (err, res) {
                if (err) throw err;
                // for (var i = 0; i < res.length; i++) {
                //     console.log("Name: " + res[i].first_name + " " + res[i].last_name + " || Role: " + res[i].role + " || Manager: " + res[i].manager);
                // }
                console.table(res);
                menu();

            });

        });
}

function employeesbyManager() {
    inquirer
        .prompt({
            name: "manager",
            type: "input",
            message: "What manager would you like to search?"
        })
        .then(function (answer) {
            var query = "SELECT first_name, last_name,role_id FROM employees WHERE manager_id=?";
            connection.query(query, { manager_id: answer.manager }, function (err, res) {
                if (err) throw err;
                console.table(res);
                menu();

            });

        });
}

function removeEmployee() {
    inquirer
        .prompt({
            name: "choice",
            type: "input",
            message: "What employee would you like to remove?"
        })
        .then(function (answer) {
            var query = "DELETE FROM employees WHERE first_name=?";
            connection.query(query, { first_name: answer.choice }, function (err, res) {
                if (err) throw err;

                console.log("Name: " + res[i].first_name + " " + res[i].last_name + "Has been deleted from the database");
                menu();

            });
        });
}

function viewEmployees() {
    var query = "SELECT * FROM employees";
    connection.query(query, function (err, res) {
        if (err) throw (err);
        console.table(res)
        menu();
    });
};

function viewRoles() {
    var query = "SELECT * FROM roles";
    connection.query(query, function (err, res) {
        if (err) throw (err);
        console.table(res)
        menu();
    });
};

function viewDepartments() {
    var query = "SELECT * FROM departments";
    connection.query(query, function (err, res) {
        if (err) throw (err);
        console.table(res)
        menu();
    });
};
function updateEmployeerole() {
    inquirer
        .prompt([
            {
                name: "employee_name",
                type: "input",
                message: "What is the name of the employee you wish to change?"
            },
            {
                name: "new_role",
                type: "input",
                message: "What is the new role?"
            },

        ])
        .then(function (answer) {
            var query =  "UPDATE employees SET role_id=? WHERE first_name=?";
            connection.query(query, { first_name:answer.employee_name, role_id:answer.new_role}, function (err, res) {
                    if (err) throw err;
                    console.log("Employee Role Updated");
                    menu();
                }
            );
        });
}

