const express = require('express');
const Task = require("../db/models/task");
const router = new express.Router();



router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})





router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})
router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) return res.status(404).send()
        res.status(200).send(task);
    } catch (e) {
        res.status(500).send(e)
    }

})



router.patch('/tasks/:id', async (req, res) => {
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


router.delete('/tasks/:id',async (req, res)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) return res.status(404).send({error: 'task not found'})
        res.status(200).send(task)
    }catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router;
