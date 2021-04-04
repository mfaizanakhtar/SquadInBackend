const config = require('config');
const jwt = require("jsonwebtoken");
const express = require('express');
const {Feed ,validate} = require('../models/feed');

const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const auth =  require('../middleware/auth');
const player =  require('../middleware/player');
const organizer=require('../middleware/organizer');
const recruiter=require('../middleware/recruiter');

router.post('/', async(req, res)=> {
    feed = new Feed({
        userid:req.body.userid,
        Activityname:req.body.Activityname,
        sport:req.body.sport,
        NoOfPlayers:req.body.NoOfPlayers,
        ActivityDescription:req.body.ActivityDescription,
        TimeStamp:req.body.TimeStamp
    })
    
    const result = await feed.save();

    res.send("Post added");
})

router.get('/all',async(req,res)=>{
    const feed = await Feed.find().populate('userid','name userType');
    res.send(feed);
})
router.get('/user/:id',async(req,res)=>{
    const feed = await Feed.find({
        userid:req.params.id
    })
    .populate('userid','name userType');
    res.send(feed);
})

module.exports = router;