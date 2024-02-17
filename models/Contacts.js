const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Contacts = sequelize.define('contacts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        length:15
    },
    country_code: {
        type: DataTypes.STRING,
        allowNull: false,
        length:5,
        default: '+91-'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    access_token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.TINYINT,
        length: 4,
        allowNull: false,
        defaultValue: 0
    },
    is_registered: {
        type: DataTypes.TINYINT,
        length: 4,
        allowNull: false,
        defaultValue: 0
    },
    is_spam: {
        type: DataTypes.TINYINT,
        length: 4,
        allowNull: false,
        defaultValue: 0
    },
    spam_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: DataTypes.NOW,
    }},
    {
        createdAt: false, 
        updatedAt: false, 
    });

module.exports = Contacts;