USE employee_db;

-- department seeds --
INSERT INTO department (name)
VALUES
('Information Systems and Technology'),
('Finance'),
('Legal'),
('Human Resources'),
('Security'),
('Sales'),

INSERT INTO role (title, salary, department_id)
VALUES
('Web Developer', 80000, 1),
('Accountant', 60000, 2),
('Paralegal', 40000, 3),
('Manager', 70000, 4),
('Web Developer', 80000, 1),
('Web Developer', 80000, 1),