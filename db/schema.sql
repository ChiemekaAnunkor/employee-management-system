DROP DATABASE IF EXISTS employee_manager;
CREATE DATABASE employee_manager;

USE employee_manager;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    names VARCHAR(30) NOT NULL
);
CREATE TABLE positions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary  DECIMAL(7,2) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) 
    REFERENCES  department(id)
    ON DELETE SET NULL
);
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT,
    FOREIGN KEY (manager_id) 
    REFERENCES  employee(id)
    ON DELETE SET NULL,
    roles_id INT,
    FOREIGN KEY (roles_id) 
    REFERENCES  positions(id)
    ON DELETE SET NULL
);