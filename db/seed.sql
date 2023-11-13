USE employee_db;

INSERT INTO department (name) VALUES 
('Human Resources'),
('Engineering'),
('Sales');

INSERT INTO role (title, salary, department_id) VALUES 
('HR Manager', 70000, 1),
('Software Engineer', 80000, 2),
('Sales Representative', 50000, 3);

INSERT INTO employee (first_name, last_name, role_id) VALUES 
('John', 'Doe', 1),
('Jane', 'Smith', 2),
('Emily', 'Johnson', 3);
