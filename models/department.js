const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Role = require('./role');

class Department extends Model {}

Department.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    modelName: 'department'
});

module.exports = Department;
