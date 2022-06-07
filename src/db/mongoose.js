const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1/task-manger-api');

const User = mongoose.model('user',{
    name:{
        type:String,
        required:true,
        trim:true

    },
    age:{
        type:Number,
        defalut:0,
        validate(v){
            if(v<0) throw new Error("You'v not come to this universe?")
        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowecase:true,
        validate(v){
            if(!validator.isEmail(v)) throw new Error('this email is just a pice of shit 💩')

        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:7,
        validate(v){
            if(validator.contains(v,'password')) throw new Error('really? password? shame on you bro')
            // if(!validator.isLength(v,{min:6})) throw new Error('Just my luck')

        }
    }
})

const me = new User({
    name:'  shahrokhelmi  ',
    age:'29',
    email:'shahrokhelmi@gmail.com  ',
    password:'fffmmsm'
})

me.save().then(console.log).catch(console.log())

const Task = mongoose.model('task',{
    description:{
        type:String,
        required:true,
        trim:true,
    },
    completed:{type:Boolean, default:false}
})


const task1 = new Task({
    description:'hi there ',
    completed:false
})

task1.save().then(console.log).catch(console.log)
