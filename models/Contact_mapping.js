const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const ContactsMapping = sequelize.define('contact_mapping', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    contact_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.TINYINT,
        length: 4,
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

module.exports = ContactsMapping;