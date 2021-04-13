const mongoose = require('mongoose');

const equipmentResponseSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    equipmentid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Equipment'
    },
    message:{
        type:String
    },
    accepted:{
        type:Boolean,
        default:null
    }
})

const equipmentResponse = mongoose.model('equipmentResponse',equipmentResponseSchema)

module.exports.equipmentResponse = equipmentResponse