require('./db/mongoose.js');
const Task = require('./db/models/task.js');


Task.findByIdAndDelete('629f425f396cab4b8f1e31b4')
    .then(r=>{
        console.log(r)
       return Task.countDocuments({completed:false})
    })
    .then(console.log)
    .catch(console.log)

// 62a4a6568b06624f7c3de8d5
const deleteTaskAndUpdate = async (id)=>{
    await Task.findByIdAndDelete(id)
    return await Task.countDocuments({completed:false})
}

deleteTaskAndUpdate('62a4a6568b06624f7c3de8d5')
.then(console.log)
.catch(console.log)
