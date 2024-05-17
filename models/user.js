// models/user.js

// Dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');
var crypt = require('../helpers/crypt');
const sequelize = require('../config/database');
const Admin = require('./admin');

// Model definition
class User extends Model {
    
    verifyPassword(password) {
        return crypt.encryptPassword(password, this.salt) === this.password;
    }
}

// Model initiation
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'username must not be empty.',
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: 'Email must not be empty.',
                },
                isEmail: {
                    msg: 'Invalid email format.',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Password must not be empty.',
                },
            },
        },
        salt: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        password_update: {
            type: DataTypes.DATE
        },
        verify_key_email: {
            type: DataTypes.STRING
        },
        verify_key_expire: {
            type: DataTypes.DATE
        },
        enabled: {
            type: DataTypes.BOOLEAN
        },
        extra: {
            type: DataTypes.STRING
        },
        admin_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Admin,
                key: Admin.id,
            },
        },
    },
    {
        sequelize,
        modelName: 'User',
        timestamps: false,
    }
);

// Model export
module.exports = User;