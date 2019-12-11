// function to handle posting new items up for auction
module.exports {
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
}