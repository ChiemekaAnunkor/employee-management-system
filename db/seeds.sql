use employee_manager;

INSERT INTO department(names)
VALUES  ("IT"),
        ("HR"),
        ("Sales"),
        ("Engineer");

INSERT INTO positions (title, salary ,department_id)
VALUES ('Software', 30000.00, 4),
        ('support', 90000.00, 1),
        ('Sales', 80000.00, 3),
        ('Manager', 40000.00, 2),
        ('Generalist', 60000.00, 2);

INSERT INTO employee (first_name, last_name ,manager_id,roles_id)
VALUES  ('james', 'cameron', 1,1),
        ('chiemeka', 'anunkor', 1,2),
        ('steven', 'Aoyi', 1,3),
        ('Laura', 'brown', 1,4),
        ('christy', 'long', 1,3);
   