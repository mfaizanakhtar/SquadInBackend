const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require('config');

const feedSchema=mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    Activityname:{
        type:String,
        required:true
    },
    ActivityDescription:{
        type:String,
        required:true
    },
    TimeStamp:{
        type:Date
        // required:true
    }
})


function validateFeed(feed) {
    const schema = {
        userid: Joi.string().required(),
        Activityname: Joi.string().required(),
        ActivityDescription: Joi.string().required(),
        TimeStamp: Joi.Date.required()    
    };
    return Joi.validate(Feed, schema);
}

const Feed = mongoose.model('Feed', feedSchema);

exports.Feed = Feed;
exports.validate = validateFeed;
