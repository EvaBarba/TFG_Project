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
                // unique: {
                //     args: true,
                //     msg: 'Email must be unique.',
                // },
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
            // set: function (password) {
            //     // String aleatorio usado como salt.
            //     this.salt = Math.round((new Date().valueOf() * Math.random())) + '';
            //     this.setDataValue('password', encryptPassword(password, this.salt));
            // }
        },
        salt: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        passwordUpdate: {
            type: DataTypes.DATE,
            field: 'password_update'
        },
        verifyKeyEmail: {
            type: DataTypes.STRING,
            field: 'verify_key_email'
        },
        verifyKeyExpire: {
            type: DataTypes.DATE,
            field: 'verify_key_expire'
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

// function encryptPassword(password, salt) {
//     return crypto.createHmac('sha1', salt).update(password).digest('hex');
// };

// Model export
module.exports = User;