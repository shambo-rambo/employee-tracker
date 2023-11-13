# Employee Tracker

## Description

This Employee Tracker is a command-line application to manage a company's employee database. It's built using Node.js, Inquirer, MySQL, and Sequelize. This project was motivated by the need to facilitate efficient and straightforward management of employee information within a company.

- **Problem it solves**: Provides an easy-to-use interface for non-technical users to view, add, and update employee data.
- **What I learned**: Gained deeper insights into Node.js, asynchronous programming, database management, and the Sequelize ORM.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Features](#features)
- [How to Contribute](#how-to-contribute)
- [Tests](#tests)

## Installation

To install this project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the cloned directory and run `npm install` to install dependencies.
3. Set up a MySQL database and run the provided schema and seed files to populate your database.
4. Update the `config/connection.js` file with your MySQL credentials.

## Usage

To use this application, run `node index.js` from the command line in the project directory. You will be presented with options to view, add, or update employee information. Choose an option and follow the prompts.


## Credits
This project was developed by [Simon Hamblin](https://github.com/shambo-rambo).

Special thanks to the following resources:

Node.js (https://nodejs.org/)
Inquirer.js (https://www.npmjs.com/package/inquirer)
MySQL (https://www.mysql.com/)
Sequelize (https://sequelize.org/)

## License
This project is licensed under the MIT License.

## Features
View employees, roles, and departments in a formatted table.
Add new employees, roles, and departments to the database.
Update existing employee roles.
Easy-to-use command-line interface.

## How to Contribute
Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change. Please ensure to update tests as appropriate.

## Tests
To run tests, navigate to the project directory and run the following command:
bash
Copy code
npm test