// To get this to work - you need to separate the inquirer from the connection to DB, that call each other and pass the answers from server.js ansers

var mysql = require("mysql");
var inquirer = require("inquirer");
class DataAccess {
    constructor(connection) {
        this.connection = connection;
    }
    viewEmployees(cb) {
        var query = "SELECT * FROM employees";
        this.connection.query(query, function (err, res) {
            if (err) throw (err);
            console.table(res)
            cb(res);
        });
    };

    addEmployee(cb) {
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
                this.connection.query(
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
                        cb(res);
                    }
                );
            });
    };

    addDepartment(cb) {
        inquirer
            .prompt([
                {
                    name: "department_name",
                    type: "input",
                    message: "What is the department you wish to add?"
                },
               
            ])
            .then(function (answer) {
                this.connection.query(
                    "INSERT INTO departments SET ?",
                    {
                        department: answer.department_name,
                        
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Department Added");
                        cb(res);
                    }
                );
            });
    }
    addRole(cb) {
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
                this.connection.query(
                    "INSERT INTO roles SET ?",
                    {
                        title: answer.role_name,
                        salary: answer.role_salary,
                        department_id: answer.role_department
                        
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Role Added");
                        cb(res);
                    }
                );
            });
    }
    employeeDepartments(cb) {
        inquirer
            .prompt({
                name: "department",
                type: "list",
                message: "What department would you like to search?",
                choices: ["Production", "Sales", "HR", "Operations"]
            })
            .then(function (answer) {   
                var query = "select * from employees inner join roles on employees.role_id=roles.id WHERE employees.role_id =?";
                this.connection.query(query, { department_id: answer.department }, function (err, res) {
                    if (err) throw err;
                    // for (var i = 0; i < res.length; i++) {
                    //     console.log("Name: " + res[i].first_name + " " + res[i].last_name + " || Role: " + res[i].role + " || Manager: " + res[i].manager);
                    // }
                    console.table(res);
                    cb(res);
    
                });
    
            });
    }
    employeesbyManager(cb) {
        inquirer
            .prompt({
                name: "manager",
                type: "input",
                message: "What manager would you like to search?"
            })
            .then(function (answer) {
                var query = "SELECT first_name, last_name,role_id FROM employees WHERE manager_id=?";
                this.connection.query(query, { manager_id: answer.manager }, function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    cb(res);
    
                });
    
            });
    }
    removeEmployee(cb) {
        inquirer
            .prompt({
                name: "choice",
                type: "input",
                message: "What employee would you like to remove?"
            })
            .then(function (answer) {
                var query = "DELETE FROM employees WHERE first_name=?";
                this.connection.query(query, { first_name: answer.choice }, function (err, res) {
                    if (err) throw err;
    
                    console.log("Name: " + res[i].first_name + " " + res[i].last_name + "Has been deleted from the database");
                    cb(res);
    
                });
            });
    }
    
    viewRoles(cb) {
        var query = "SELECT * FROM roles";
        this.connection.query(query, function (err, res) {
            if (err) throw (err);
            console.table(res)
            cb(res);
        });
    };
    
    viewDepartments(cb) {
        var query = "SELECT * FROM departments";
        this.connection.query(query, function (err, res) {
            if (err) throw (err);
            console.table(res)
            cb(res);
        });
    };
    updateEmployeerole(cb) {
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
                this.connection.query(
                    `UPDATE employees SET role=${answer.new_role} WHERE employee_firstname=${answer.employee_name}`,
    
                    function (err) {
                        if (err) throw err;
                        console.log("Employee Role Updated");
                        cb(res);
                    }
                );
            });
    }
}

module.exports = DataAccess;