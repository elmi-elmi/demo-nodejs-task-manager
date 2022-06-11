const mongoose = require('mongoose');


const Task = mongoose.model('task',{
    description:{
        require:true,
        type:String,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})


module.exports = Task
