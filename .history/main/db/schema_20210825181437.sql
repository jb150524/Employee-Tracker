DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE registrar_db;

USE registrar_db;

CREATE TABLE deparment (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
);

CREATE TABLE ROLE (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role_title VARCHAR(30) NOT NULL,
    salary DECIMAL
    deparment_id
);