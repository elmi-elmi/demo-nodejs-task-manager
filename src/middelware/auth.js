const jwt = require('jsonwebtoken');
const User = require('../db/models/user');


const auth = async (req, res, next)=>{
    try{
    console.log('auth')
    const token = req.header('Authorization').replace('Bearer ','')
    const decode = jwt.verify(token,'thisistherandomstring')
    console.log(decode)
    const user = await User.find({_id:decode._id,'tokens.token':token})
    console.log(user)

    req.user = user
    next()
    }catch(e){
        res.status(401).send('Please authenticate.')
    }
}


module.exports = auth;