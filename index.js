const inquirer = require('inquirer');
const sequelize = require('./config/connection');

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

const Department = require('./models/department');

function viewDepartments() {
    Department.findAll()
        .then((departments) => {
            console.log('All Departments');
            departments.forEach((department) => console.log(department.name));
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


mainMenu();