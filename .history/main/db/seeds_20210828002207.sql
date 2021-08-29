USE employee_db;

-- department seeds --
INSERT INTO department (name)
VALUES
('Information Systems and Technology'),
('Finance'),
('Legal'),
('Human Resources'),
('Security'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Web Developer', 80000, 1),
('Accountant', 60000, 2),
('Paralegal', 40000, 3),
('Manager', 70000, 4),
('Engineer', 80000, 5),
('Sales Rep', 40000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Poco, Sanchez', 1, 450),
('Alberto, Vaquez', 2, 345),
('Jose, Ricardoza', 3, 123),
('Maria, Cruz', 4, 143),
(', Cruz', 4, 143),
('Gerardo, Ortiz', 5, 500);