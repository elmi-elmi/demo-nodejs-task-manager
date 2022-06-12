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

app.get('/users', (req, res) => {
    User.find({}).then(users => res.send(users)).catch(e => res.status(500).send(e))
})

app.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            console.log('*****')
            if (!user) {
                return res.status(404).send()
            }
            res.status(200).send(user)

        })
        .catch(e => {
            res.status(500).send(e)
        })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then(tasks => res.send(tasks)).catch(e => res.status(500).send())
})
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
    Task.findById(_id)
        .then((task) => {
            console.log('************')
            if(!task){
                return res.status(404).send()
            }
            res.send(task)
        })
        .catch(e => {
            console.log(e)
            res.status(500).send(e)
        })
})




app.listen(port, () => {
    console.log('listen on ', port)
})
