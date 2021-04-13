const {equipmentResponse} = require("../models/equipmentresponse");
const express = require('express');
const router = express.Router();

router.get("/equipment/:id",async(req,res)=>{
    const result = await equipmentResponse.find({
        equipmentid:req.params.id
    })
    .populate('userid')
    res.send(result)
})

router.post("/equipment",async(req,res)=>{
    const result = new equipmentResponse({
        userid:req.body.userid,
        equipmentid:req.body.equipmentid,
        message:req.body.message
    })
    await result.save()
})

router.put("/accept/:id",async(req,res)=>{
    const result = await equipmentResponse.findOneAndUpdate({
        $set:{
            accepted:true
        }
    })

    res.send(result)
})

module.exports = router;