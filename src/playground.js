require('./db/mongoose.js');
const Task = require('./db/models/task.js');


Task.findByIdAndDelete('629f425f396cab4b8f1e31b4')
    .then(r=>{
        console.log(r)
       return Task.countDocuments({completed:false})
    })
    .then(console.log)
    .catch(console.log)
