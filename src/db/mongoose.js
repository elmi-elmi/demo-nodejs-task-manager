const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/task-manger-api');

//
// const me = new User({
//     name:'  shahrokhelmi  ',
//     age:'29',
//     email:'shahrokhelmi@gmail.com  ',
//     password:'fffmmsm'
// })
//
// me.save().then(console.log).catch(console.log())
//
// const Task = mongoose.model('task',{
//     description:{
//         type:String,
//         required:true,
//         trim:true,
//     },
//     completed:{type:Boolean, default:false}
// })
//
//
// const task1 = new Task({
//     description:'hi there ',
//     completed:false
// })
//
// task1.save().then(console.log).catch(console.log)
