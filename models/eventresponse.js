const mongoose = require('mongoose');

const eventResponseSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    eventid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event'
    },
    managername:{
        type:String
    },
    teamname:{
        type:String
    },
    clubname:{
        type:String
    },
    address:{
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

const eventResponse = mongoose.model('eventResponse',eventResponseSchema)
exports.eventResponseSchema = eventResponseSchema;
module.exports.eventResponse = eventResponse