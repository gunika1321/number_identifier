const Joi = require('joi');
const userService = require('../services/user');
const _ = require('underscore');

const Joiobject = Joi.object().keys({
    device_details: Joi.object().optional(),
    device_type: Joi.number().optional()
})

exports.signUp = function(req, res, next){
    const schema = Joiobject.keys({
        email: Joi.string().optional(),
        password: Joi.string().required(),
        phone_number: Joi.number().required(),
        country_code: Joi.string().required(),
        full_name: Joi.string().required()
    })

    if(valid(schema, req, res)){
        next();
    }
}

exports.signIn = function(req, res, next){
    const schema = Joiobject.keys({
        password: Joi.string().required(),
        phone_number: Joi.number().required(),
        country_code: Joi.string().required()
    });

    if(valid(schema, req, res)){
        next();
    }
}

exports.markSpam = async function(req, res, next){
    const schema = Joiobject.keys({
        user_id: Joi.number().required(),
        is_spam : Joi.number().valid(0,1).required(),
        access_token: Joi.string().required()
    });

    if(valid(schema, req, res)){
        let userData = await userService.checkValidToken(req.body.access_token);
        if(_.isEmpty(userData)){
            res.status(401).send({error: 'Not authorized to perform this action!!'})
        }

        req.body.userData = userData;
        next();
    }
}


exports.search = async function(req, res, next){
    const schema = Joiobject.keys({
        access_token: Joi.string().required(),
        search_value: Joi.string().required(),
        country_code: Joi.string.optional()
    });

    if(valid(schema, req, res)){
        let userData = await userService.checkValidToken(req.body.access_token);

        if(_.isEmpty(userData)){
            res.status(401).send({error: 'Not authorized to perform this action!!'})
        }
        req.body.userData = userData;
        next();
    }
}

function valid(schema, req, res){
    if(req.method == 'GET'){
        req.body = req.query || req.params;
    }

    const validation = schema.validate(req.body);
    if(validation.error) {
      let errorName = validation.error.name;
      let errorReason = validation.error.details !== undefined
        ? validation.error.details[0].message : 'Invalid Request'
      res.status(500).send({error: errorName,reason: errorReason})
      return false;
    }
    return true;
}