var mysql = require("mysql");
var inquirer = require("inquirer");

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

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    menu();
});

// function which prompts the user for what action they should take
function menu() {
    inquirer
        .prompt({
            name: "menu",
            type: "list",
            message: "Would you like to do?",
            choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Manager"]
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
    }
}

// function to handle posting new items up for auction
function addEmployee() {
    // prompt for info about the item being put up for auction
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
                type: "input",
                message: "What is the role of the employee?",
            },
            {
                name: "employee_manager",
                type: "input",
                message: "What is the manager ID of the employee?",
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO employees SET ?",
                {
                    first_name: answer.employee_firstname,
                    last_name: answer.employee_lastname,
                    role: answer.role,
                    manager: answer.employee_manager,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee Added");
                    // re-prompt the user for if they want to bid or post
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
            var query = "SELECT first_name, last_name, role, manager FROM employees WHERE ?";
            connection.query(query, { department: answer.department }, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    console.log("Name: " + res[i].first_name + " " + res[i].last_name + " || Role: " + res[i].role + " || Manager: " + res[i].manager);
                }
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
            var query = "SELECT first_name, last_name,role FROM employees WHERE ?";
            connection.query(query, { manager: answer.manager }, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    console.log("Name: " + res[i].first_name + " " + res[i].last_name + " || Role: " + res[i].role);
                }
                menu();
            });
        });
}

function removeEmployee() {
    inquirer
        .prompt({
            name: "choice",
            type: "input",
            message: "What employee would you like to remove? (Please search by last name)"
        })
        .then(function (answer) {
            var query = "DELETE FROM employees WHERE last_name=?";
            connection.query(query, { last_name: answer.choice }, function (err, res) {
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

    })
}

function updateEmployeerole() {
    // prompt for info about the item being put up for auction
    inquirer
        .prompt([
            {
                name: "employee_role",
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
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "UPDATE employees SET role=? WHERE employee_firstname= ?",
                {
                    first_name: answer.employee_firstname,
                    last_name: answer.employee_lastname,
                    role: answer.role,
                    manager: answer.employee_manager,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee Added");
                    // re-prompt the user for if they want to bid or post
                    menu();
                }
            );
        });
}

