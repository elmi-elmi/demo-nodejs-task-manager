const express = require('express');
const User = require('./db/models/user.js');
const Task = require('./db/models/task.js');

require('./db/mongoose.js')

const app = express();
const port = process.env.PORT | 3000;
app.use(express.json())

app.post('/users', (req, res) => {
    const task = new User(req.body);
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(401).send(e)
    })
})

app.listen(port, () => {
    console.log('listen on ', port)
})
