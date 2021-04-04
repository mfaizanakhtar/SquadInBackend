const { response } = require('express');
const express = require('express');
const router = express.Router();
const {activityResponse} = require('../models/activityresponse');

router.post('/',async(req,res)=>{
    const actResponse = new activityResponse({
        userid:req.body.userid,
        feedid:req.body.feedid,
        Experience:req.body.Experience,
        Description:req.body.Description,
        Address:req.body.Address
    })

    const result = await actResponse.save()
    res.send("resultrecorded");
    console.log("response done")
})

router.get('/feed/:feedid',async(req,res)=>{
    const actResponse = await activityResponse.find({
        feedid:req.params.feedid
    })
    .populate('userid','name')

    res.send(actResponse);
})

router.get('/user/:userid',async(req,res)=>{
    const actResponse = await activityResponse.find({
        userid:req.params.userid
    })
    res.send(actResponse);
})

module.exports = router