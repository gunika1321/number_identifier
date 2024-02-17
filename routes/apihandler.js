const UserController = require('../Controllers/user')

exports.signUp = async function(req,res){
    try{
        let data = await UserController.signUp(req.body);
        res.status(200).send({data: data});
    }catch(e){
        res.status(400).send({error: e ? e.message: 'Some error Occurred'});
    } 
}

exports.signIn = async function(req,res){
    try{
        let data = await UserController.signIn(req.body);
        res.status(200).send({data: data});
    }catch(e){
        res.status(400).send({error: e ? e.message: 'Some error Occurred'});
    } 
}

exports.markSpam = async function(req,res){
    try{
        let data = await UserController.markSpam(req.body);
        res.status(200).send({data: data});
    }catch(e){
        res.status(400).send({error: e ? e.message: 'Some error Occurred'});
    } 
}

exports.search = async function(req,res){
    try{
        let data = await UserController.search(req.body);
        res.status(200).send({data: data});
    }catch(e){
        res.status(400).send({error: e ? e.message: 'Some error Occurred'});
    } 
}