const express = require('express');
const User = require('./db/models/user.js');
require('./db/mongoose.js')

const app = express();
const port = process.env.PORT | 3000;
app.use(express.json())

app.post('/users',(req, res)=>{
    console.log(req.body)
    console.log('-----')
    const user = new User(req.body);
    user.save().then(()=>{
        res.send(user)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

app.listen(port,()=>{
    console.log('listen on ', port)
})
