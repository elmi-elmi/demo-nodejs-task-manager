const jwt = require('jsonwebtoken');
const User = require('../db/models/user');


const auth = async (req, res, next)=>{
    try{
        console.log('***')
    const token = req.header('Authorization').replace('Bearer ','')

    const decode = jwt.verify(token,'thisistherandomstrings')
    const user = await User.findOne({_id:decode._id,'tokens.token':token})
        if(!user) throw new Error()
    req.token = token
    req.user = user
    next()
    }catch(e){
        res.status(401).send({error:'Please authenticate.'})
    }
}


module.exports = auth;
