const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Department = require('./department'); 

class Role extends Model {}

Role.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salary: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'department',
            key: 'id'
        }
    }
}, {
    sequelize,
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    modelName: 'role'
});

module.exports = Role;
