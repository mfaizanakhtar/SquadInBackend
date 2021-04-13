const mongoose = require('mongoose');
const express = require('express')
const router = express.Router()
const {Notification} = require('../models/notification')

router.get('/user/:id',async(req,res)=>{
    const notif = await Notification.find({
        userid:req.params.id
    })
    res.send(notif)
})

router.post('/user',async(req,res)=>{
    const notif = new Notification({
        userid:req.body.userid,
        title:req.body.title
    })
    const result = await notif.save()
    res.send(result)
})

router.get('/usercount/:id',async(req,res)=>{
    const notif = await Notification.countDocuments({
        userid:req.params.id,
        seen:false
    })

    res.send({count:notif})
})

router.put('/userseen/:id',async(req,res)=>{
    const notif = await Notification.updateMany({
        $set:{
            seen:true
        }
    })

    res.send(notif)
})

module.exports = router