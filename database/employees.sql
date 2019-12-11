    DROP DATABASE IF EXISTS companyDB;

    CREATE DATABASE companyDB;

    USE companyDB;

    CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(45) NULL,
    last_name VARCHAR(45) NULL,
    role VARCHAR(45) NULL,
    manager INT(10) NULL,
    PRIMARY KEY (id)
    );

    CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NULL,
        PRIMARY KEY (id)
    );

    CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NULL,
    salary INT(10) NULL,
    department_id INT(10) NULL,
    PRIMARY KEY (id)
    );

    INSERT INTO employees (first_name, last_name, role, manager)
    VALUES ("Vanilla", "Ice", "Wrapper", 2);

    INSERT INTO departments (name)
    VALUES ("Production");


    INSERT INTO roles (title, salary, department_id)
    VALUES ("Wrapper", 10,000, 3);
