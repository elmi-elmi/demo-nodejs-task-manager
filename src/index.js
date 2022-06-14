const express = require('express');
const User = require('./db/models/user.js');
const Task = require('./db/models/task.js');

require('./db/mongoose.js')

const app = express();
const port = process.env.PORT | 3000;
app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }

})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send()
        res.status(201).send(user)
    } catch (e) {
        res.status(500).send(e)
    }

})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})
app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) return res.status(404).send()
        res.status(200).send(task);
    } catch (e) {
        res.status(500).send(e)
    }

})


app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'password', 'age', 'email'];

    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));

    if (!isValidUpdate) return res.status(400).send({error: 'Invalid Updates!'})

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if (!user) return res.status(404).send()
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e)
    }

})

app.patch('/tasks/:id', async (req, res) => {
    const updates = ['description', 'completed']
    const keys = Object.keys(req.body);
    const isValidUpdate = keys.every(key => updates.includes(key))

    if (!isValidUpdate) return res.status(400).send({error: 'Invalid Update'})

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!task) return res.status(4040).res({error: 'the task not found'})
        res.status(200).send(task)


    }catch (e) {
        res.status(400).send(e)
    }
})

app.delete('/users/:id',async (req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) return res.status(404).send({error: 'The user not found'})
        res.status(200).send(user)
    }catch (e){
        res.status(400).send(e)
    }
})
app.delete('/tasks/:id',async (req, res)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) return res.status(404).send({error: 'task not found'})
        res.status(200).send(task)
    }catch (e) {
        res.status(400).send(e)
    }
})
app.listen(port, () => {
    console.log('listen on ', port)
})
