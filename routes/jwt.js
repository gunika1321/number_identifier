const jwt = require('jsonwebtoken');

// Example secret key (change it to a secure value in production)
const secretKey = 'phone_number_token';


exports.createToken = function(payload){
    let expiresIn = 5 * 24 * 60 * 60;
    return jwt.sign(payload, secretKey, { expiresIn });
}

exports.verifyToken = function(token){
    try{
        return jwt.verify(token, secretKey);
    }catch(e){
        return false;
    }
}

