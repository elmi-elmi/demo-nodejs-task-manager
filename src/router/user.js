const express = require('express')

const User = require("../db/models/user");
const auth = require('../middelware/auth');
const router = new express.Router()


router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user,token})
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }

})

router.post('/users/login',async (req, res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch (e){
        res.status(400).send(e)
    }
})


router.post('/users/logout',auth, async (req, res)=>{
    try {
        console.log(req.user)
        req.user.tokens = req.user.tokens.filter(token=>token !== req.token)
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutall', auth, async (req, res)=>{
    try {
        console.log('router logoutall')
        console.log(req.user)
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
    res.status(500).send()
    }
})



router.get('/users/me', auth,async (req, res) => {


    res.send(req.user)
})




router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send()
        res.status(201).send(user)
    } catch (e) {
        res.status(500).send(e)
    }

})

router.patch('/users/me', auth,async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'password', 'age', 'email'];

    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));

    if (!isValidUpdate) return res.status(400).send({error: 'Invalid Updates!'})

    try {
        // const user = await User.findById(req.params.id)
        const user = req.user
        updates.forEach(update=>user[update] = req.body[update])
        user.save();
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        // if (!user) return res.status(404).send()
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e)
    }

})

router.delete('/users/me',auth,async (req, res)=>{
    try {
        // const user = await User.findByIdAndDelete(req.params.id);
        // if(!user) return res.status(404).send({error: 'The user not found'})
        console.log(req.user)
        await req.user.remove();
        console.log('----')
        res.send(req.user)
    }catch (e){
        console.log(e)
        res.status(400).send(e)
    }
})


module.exports = router
