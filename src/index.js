const express = require('express');
const User = require('./db/models/user.js');
const Task = require('./db/models/task.js');
const userRouter = require('./router/user.js');
const taskRouter = require('./router/task.js');

require('./db/mongoose.js')

const app = express();
const port = process.env.PORT | 3000;



app.use(express.json())

app.use(userRouter);
app.use(taskRouter);



app.listen(port, () => {
    console.log('listen on ', port)
})
