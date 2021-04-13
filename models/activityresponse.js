const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const activityResponseSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    feedid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Feed'
    },
    Experience:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
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

const activityResponse=mongoose.model('activityResponse',activityResponseSchema);

exports.activityResponse=activityResponse;
exports.activityResponseSchema=activityResponseSchema