const { Sequelize } = require('sequelize');
const _ = require('underscore');
const Contacts = require('../models/Contacts');
const ContactsMapping = require('../models/Contact_mapping');
const jwt = require('../routes/jwt');

exports.findUser = function (payload) {
    return Contacts.findOne({
        where: {
            phone_number: payload.phone_number,
            country_code: payload.country_code
        }
    })
}

exports.createUser = function (payload) {
    return Contacts.create({
        full_name: payload.full_name,
        email: payload.email || null,
        phone_number: payload.phone_number,
        country_code: payload.country_code,
        access_token: payload.access_token,
        password: payload.password,
        is_registered: 1,
        status: 1
    })
}


exports.checkValidToken = async function (token) {
    let decodedToken = jwt.verifyToken(token)
    if (!decodedToken) {
        return {}
    }

    let phoneNumber = decodedToken.phone_number;
    let countryCode = decodedToken.country_code;

    return Contacts.findOne({
        where: {
            phone_number: phoneNumber,
            country_code: countryCode,
            is_registered: 1,
            status: 1
        }
    })
}

exports.markSpam = function (payload) {
    return Contacts.update({ is_spam: payload.is_spam }, {
        where: {
            id: payload.user_id,
        },
    }).then(
        Contacts.increment('spam_count', { where: { id: payload.user_id } })
    )
}

exports.searchUser = async function (payload) {
    let data;
    if (payload.is_name) {
        data = await Contacts.findAll({
            attributes: [
                         'full_name', 
                         [Sequelize.literal(CONCAT('country_code','phone_number')),'phone_number'],
                         [Sequelize.literal('is_spam'), 'spam_likelihood'],
                         [Sequelize.literal('CASE WHEN is_registered = 1 THEN email END'), 'email'],
                        ],
            where: {
                full_name: {
                    [Sequelize.Op.like]: `%${payload.where_clause.full_name}%`
                },
                id: {
                    [Sequelize.Op.ne]: payload.userData.id
                }
            },
            order: [
                [Sequelize.literal("CASE WHEN full_name LIKE '" + payload.where_clause.full_name + "%' THEN 0 ELSE 1 END")],
                ['full_name', 'ASC']
            ]
        });
    } else {
        data = Contacts.findAll({
            attributes: [
                        'full_name', 
                        [Sequelize.literal(CONCAT('country_code','phone_number')),'phone_number'],
                        [Sequelize.literal('is_spam'), 'spam_likelihood'],
                        [Sequelize.literal('CASE WHEN is_registered = 1 THEN email END'), 'email'],
                        ],
            where: {
                phone_number: payload.where_clause.phone_number,
                country_code: payload.where_clause.country_code,
                is_registered: 1
            }
        })

        if (_.isEmpty(data)) {
            data = Contacts.findAll({
                attributes: [
                             [Sequelize.literal('contact_mapping.full_name'), 'full_name'],
                             [Sequelize.literal(CONCAT('contacts.country_code','contacts.phone_number')),'phone_number'],
                             [Sequelize.literal('contacts.is_spam'), 'spam_likelihood']
                            ],
                include: [
                    {
                    model: ContactsMapping,
                    attributes: [],
                    where: {
                        contact_id: Sequelize.col('contacts.id')
                    }
                    }
                ],
                where: {
                    phone_number: payload.where_clause.phone_number,
                    country_code: payload.where_clause.country_code
                }
            })
        }
    }
    return data;
}