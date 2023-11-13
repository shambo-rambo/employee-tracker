const inquirer = require('inquirer');
const sequelize = require('./config/connection');
const { Model, DataTypes } = require('sequelize');
const table = require('console.table');

const Department = require('./models/department');
const Role = require('./models/role');
const Employee = require('./models/employee');

Department.hasMany(Role, { foreignKey: 'department_id' });
Role.belongsTo(Department, { foreignKey: 'department_id' });
Employee.belongsTo(Role, { foreignKey: 'role_id' });
Employee.belongsTo(Employee, { as: 'Manager', foreignKey: 'manager_id' });

function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: [
                'View all departments', 
                'View all roles', 
                'View all employees', 
                'Add a department', 
                'Add a role', 
                'Add an employee', 
                'Update an employee role'
            ],
        }
    ])
        .then((answer) => {
            switch (answer.mainMenu) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Exit':
                    sequelize.close();
                    break;
                default:
                    console.log(`Invalid action: ${answer.action}`);
                    mainMenu();
            }
        })
    .catch((error) => {
        console.error('Error: ' + error);
        mainMenu();
    });
}

function viewDepartments() {
    Department.findAll()
        .then((departments) => {
            const departmentData = departments.map(department => ({
                'Department ID': department.id,
                'Department Name': department.name
            }));

            console.table(departmentData);

            mainMenu();
        })
        .catch((error) => {
            console.error('Error: ' + error);
            mainMenu();
        });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?',
            validate: (name) => {
                if (name) {
                    return true;
                } else {
                    console.log('Please enter a department name.');
                    return false;
                }
            }
        }
    ])
        .then((answer) => {
            Department.create({
                name: answer.name
            })
                .then(() => {
                    console.log(`Added ${answer.name} to the database.`);
                    mainMenu();
                })
                .catch((error) => {
                    console.error('Error: ' + error);
                    mainMenu();
                });
        })
        .catch((error) => {
            console.error('Error: ' + error);
            mainMenu();
        });
}

function viewRoles() {
    Role.findAll({
        include: [{
            model: Department,
            attributes: ['name']
        }],
        attributes: ['id', 'title', 'salary'] 
    }).then(roles => {
        const roleData = roles.map(role => ({
            'Role ID': role.id,
            'Title': role.title,
            'Department': role.department.name,
            'Salary': role.salary
        }));
        console.table(roleData);
        mainMenu();
    }).catch(err => {
        console.error('Error fetching roles:', err);
        mainMenu();
    });
}


function addRole() {
    Department.findAll()
        .then(departments => {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'What is the title of the role?',
                    validate: (title) => {
                        if (title) {
                            return true;
                        } else {
                            console.log('Please enter a role title.');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary of the role?',
                    validate: (salary) => {
                        if (salary) {
                            return true;
                        } else {
                            console.log('Please enter a role salary.');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'What is the department ID of the role?',
                    choices: departments.map(department => ({name: department.name, value: department.id})),
                }
         ])
        .then((answer) => {
            Role.create({
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department_id
            })
                .then(() => {
                    console.log(`Added ${answer.title} to the database.`);
                    mainMenu();
                })
                .catch((error) => {
                    console.error('Error: ' + error);
                    mainMenu();
                });
        })
        .catch((error) => {
            console.error('Error: ' + error);
            mainMenu();
        });
        })
}

function viewEmployees() {
    Employee.findAll().then(employees => {
        console.log("All Employees:");
        employees.forEach(emp => console.log(`${emp.first_name} ${emp.last_name}`));
        mainMenu();
    }).catch(err => {
        console.error('Error fetching employees:', err);
        mainMenu();
    });
}

function addEmployee() {
    // Fetch roles and employees in parallel
    Promise.all([Role.findAll(), Employee.findAll()])
        .then(([roles, employees]) => {
            // Prepare role choices
            const roleChoices = roles.map(role => ({
                name: role.title,
                value: role.id
            }));

            // Prepare manager choices (including an option for no manager)
            const managerChoices = employees.map(emp => ({
                name: `${emp.first_name} ${emp.last_name}`,
                value: emp.id
            }));
            managerChoices.unshift({ name: 'None', value: null });

            // Prompt user for employee details
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the first name of the employee?',
                    validate: first_name => first_name ? true : 'Please enter a first name.'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is the last name of the employee?',
                    validate: last_name => last_name ? true : 'Please enter a last name.'
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'What is the role of the employee?',
                    choices: roleChoices
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Who is the manager of the employee?',
                    choices: managerChoices
                }
            ]);
        })
        .then(answer => {
            // Create a new employee with the provided answers
            return Employee.create({
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id
            });
        })
        .then(() => {
            console.log('Employee added successfully.');
            mainMenu();
        })
        .catch(error => {
            console.error('Error: ' + error);
            mainMenu();
        });
}

function updateEmployeeRole() {
    Promise.all([Employee.findAll(), Role.findAll()])
        .then(([employees, roles]) => {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Which employee\'s role do you want to update?',
                    choices: employees.map(emp => ({
                        name: `${emp.first_name} ${emp.last_name}`,
                        value: emp.id
                    }))
                },
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'Which role do you want to assign to the selected employee?',
                    choices: roles.map(role => ({
                        name: role.title,
                        value: role.id
                    }))
                }
            ]).then(answers => {
                return Employee.update(
                    { role_id: answers.roleId },
                    { where: { id: answers.employeeId } }
                );
            }).then(() => {
                console.log('Employee\'s role updated successfully.');
                mainMenu();
            }).catch(err => {
                console.error('Error updating employee\'s role:', err);
                mainMenu();
            });
        }).catch(err => {
            console.error('Error fetching data:', err);
            mainMenu();
        });
}

mainMenu();