const { response } = require('express');
const express = require('express');
const router = express.Router();
const {eventResponse} = require('../models/eventresponse');
const {Event} = require('../models/event')

router.post('/',async(req,res)=>{
    const eveResponse = new eventResponse({
        userid:req.body.userid,
        eventid:req.body.eventid,
        managername:req.body.managername,
        teamname:req.body.teamname,
        clubname:req.body.clubname,
        address: req.body.address
    })

    const result = await eveResponse.save()
    res.send("resultrecorded");
    console.log("response done")
})

router.get('/event/:eventid',async(req,res)=>{
    const eveResponse = await eventResponse.find({
        eventid:req.params.eventid
    })
    .populate('userid','name')

    res.send(eveResponse);
})

router.get('/user/:userid',async(req,res)=>{
    const eveResponse = await eventResponse.find({
        userid:req.params.userid
    })
    res.send(eveResponse);
})

router.put('/accept/:responseid',async(req,res)=>{
    // console.log('api called'+req.params.responseid)
    const eveResponse = await eventResponse.updateMany({
        _id:req.params.responseid
    },{
        $set:{
        Accepted:true,
        AcceptMessage:req.body.acceptmessage,
        AcceptById:req.body.AcceptById
    }
    })

    // Event.update()
    console.log(eveResponse)
    res.send(eveResponse)
})

// router.get('/acceptby/:acceptid',async(req,res)=>{
//     const actRes = await activityResponse.find({
//         AcceptById:req.params.acceptid
//     }
//     )
//     .populate('userid','name')
//     .populate('feedid')
//     console.log(actRes)
//     res.send(actRes)
// })

router.get('/',async(req,res)=>{
    const eveResponse = await eventResponse.find({
    })
    .populate('userid','name userType')
    .populate('eventid')
    console.log(eveResponse);
    res.send(eveResponse);
})

module.exports = router