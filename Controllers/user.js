const Contacts = require('../models/Contacts');
const md5 = require('md5');
const jwt = require('../routes/jwt');
const _ = require('underscore');
const userService = require('../services/user');

exports.signUp = async function(payload){
    payload.password = md5(payload.password);
    payload.access_token = jwt.createToken({phone_number: payload.phone_number, country_code: payload.country_code});

    let data = await userService.createUser(payload);

    const {full_name, email, access_token, status, phone_number, country_code} = data;
    return {full_name, email, access_token, status, phone_number, country_code};
}

exports.signIn = async function(payload){

   let data = await userService.findUser(payload);
   
   if(_.isEmpty(data)){
    throw new Error('No user found');
   }

   payload.password = md5(payload.password);

   if(data.password != payload.password){
    throw new Error('Password mismatch');
   }

   const {full_name, email, access_token, status, phone_number, country_code} = data;
   return {full_name, email, access_token, status, phone_number, country_code}
}

exports.markSpam = async function(payload){

    await userService.markSpam(payload);
    
    return {message: 'Updated Successfully'};
 }


exports.search = async function(payload){
    payload.where_clause = {};

    if(!payload.country_code){
        payload.where_clause.full_name = payload.search_value 
        payload.is_name = true;
    }else{
        payload.where_clause.phone_number = payload.search_value;
        payload.where_clause.country_code = payload.country_code;
    }
    
   let data = await userService.searchUser(payload);

    return data;
 }