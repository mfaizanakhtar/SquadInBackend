const config = require('config');
const jwt = require("jsonwebtoken");
const express = require('express');
const {Team} = require('../models/team');

const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const auth =  require('../middleware/auth');
const player =  require('../middleware/player');
const organizer=require('../middleware/organizer');
const recruiter=require('../middleware/recruiter');

router.post('/', async(req, res)=> {
    const team = new Team({
        userid: req.body.userid,
       teamname: req.body.teamname
    })
    
    const result = await team.save();

    res.send("Post added");
})

router.get('/all',async(req,res)=>{
    const team = await Team.find().populate('userid','name userType');
    res.send(team);
})
router.get('/team/:id',async(req,res)=>{
    // console.log(req.params.id)
    const team = await Team.find({
        userid:req.params.id
        
    })
    .populate('userid','name userType')
    .populate('teammembers','name email userType')
    res.send(team);
})

router.put('/teammember/:teamid',async(req,res)=>{
    console.log(req.params.teamname)
	const team = await Team.update({_id:req.params.teamid},
        { $push: {teammembers:req.body.playerid}})
    
    

// const team = await Team.find({teamname:req.params.teamname})
// team.teammembers.push(req.body.playerid)
// team.save();

})

// router.delete('/feed/:id',async(req,res)=>{
//     const feed = await Feed.deleteOne({
//         _id:req.params.id
//     })
//     res.send(feed)
// })

// router.get('/cricket',  async (req, res) => {
//     var feed =  Feed.find();
// feed.countDocuments({sport:"cricket"},function (err, count) {
//     if (err) res.send(err)
//     else res.json(count)
    
    
// });

// });

module.exports = router;