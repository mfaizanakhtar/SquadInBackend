const { response } = require('express');
const express = require('express');
const router = express.Router();
const {bioData} = require('../models/biodata');

router.post('/',async(req,res)=>{
    const bdata = new bioData({
        userid:req.body.userid,
        eventid:req.body.eventid,
        academy:req.body.academy,
        address:req.body.address,
        sport:req.body.sport,
        height:req.body.height,
        weight: req.body.weight,
        age: req.body.age,
        preclubs: req.body.preclubs,
        sportsback: req.body.sportsback
    })

    const result = await bdata.save()
    res.send("resultrecorded");
    console.log("response done")
})

router.get('/bio/:id' ,async(req,res)=>{
    // console.log(req.params.id)
    const bdata = await bioData.find({userid:req.params.id})
    .populate('userid','name userType email')
    res.send(bdata);
})

router.get('/sports',async(req,res)=>{
    var SportCount = await bioData.aggregate([{
        $group:{
            _id:"$sport",count:{$sum:1}
        }
    }])

    res.send(SportCount)
})

module.exports = router