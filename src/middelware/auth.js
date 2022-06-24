const jwt = require('jsonwebtoken');
const User = require('../db/models/user');


const auth = async (req, res, next)=>{
    try{
    const token = req.header('Authorization').replace('Bearer ','')
    console.log('---auth---------')
    console.log(token)
    
    const decode = jwt.verify(token,'thisistherandomstrings')
    console.log(decode)
    const user = await User.findOne({_id:decode._id,'tokens.token':token})
    req.token = token
    req.user = user
    console.log(token)
    console.log(user)
    next()
    }catch(e){
        res.status(401).send({error:'Please authenticate.'})
    }
}


module.exports = auth;