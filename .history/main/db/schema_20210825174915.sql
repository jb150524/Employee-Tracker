DROP DATABASE IF EXISTS registrar_db;
CREATE DATABASE registrar_db;

USE registrar_db;

CREATE TABLE deparment (
    id INT NOT NULL,
    first_name VARCHAR(30),
    L_name VARCHAR(30),
);