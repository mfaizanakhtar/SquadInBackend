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

router.put('/accept/:responseid',async(req,res)=>{
    // console.log('api called'+req.params.responseid)
    const acceptRes = await activityResponse.updateMany({
        _id:req.params.responseid
    },{
        $set:{
        Accept:true,
        AcceptMessage:req.body.acceptmessage,
        AcceptById:req.body.AcceptById
    }
    })
    console.log(acceptRes)
    res.send(acceptRes)
})

router.get('/acceptby/:acceptid',async(req,res)=>{
    const actRes = await activityResponse.find({
        AcceptById:req.params.acceptid
    }
    )
    .populate('userid','name')
    .populate('feedid')
    console.log(actRes)
    res.send(actRes)
})

module.exports = router