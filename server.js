const express = require('express');
const sequelize = require('./config/connection');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Employee Tracker API');
    });

sequelize.authenticate()
.then(() => console.log('Connected to the database'))
.catch(err => console.log('Error: ' + err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
    });