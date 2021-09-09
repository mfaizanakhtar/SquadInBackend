const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require('config');

const eventSchema = new mongoose.Schema({
    userid:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    eventname: {
        type:String,
        required: true
    },
    EventCategory: {
        type: String,
        required: true,
       
    },
    eventDate: {
        type: String,
        required: true
    },
    eventtime: {
        type: String
     },
     summary: {
        type: String,
        required: true,
     },
     applicants:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:'User'
     }]

    

    
})

function validateEvent(event) {
    const schema = {
        userid:Joi.string().required(),
        eventname: Joi.string().required(),
        EventCategory: Joi.string().required(),
        eventDate: Joi.string().required(),
        eventtime: Joi.string().required(),
        summary:Joi.string().required(),
    
    };
    return Joi.validate(event, schema);
}

const Event = mongoose.model('Event', eventSchema);



exports.Event = Event;
exports.validate = validateEvent;