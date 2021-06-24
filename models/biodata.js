const mongoose = require('mongoose');

const biodataSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    eventid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event'
    },
    academyname:{
        type:String
    },
    address:{
        type:String
    },
    sport:{
        type:String
    },
    height:{
        type:String
    },
    weight:{
        type:String
    },
    age:{
        type:String
    },
    preclubs:{
        type:String
    },
    sportsback:{
        type:String
    },
    Accept:{
        type:Boolean,
        default:null
    },
    AcceptMessage:{
        type:String
    },
    AcceptById:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const bioData = mongoose.model('bioData',biodataSchema)
exports.biodataSchema = biodataSchema;
module.exports.bioData = bioData