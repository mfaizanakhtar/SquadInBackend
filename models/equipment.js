const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require('config');

const equipmentSchema = new mongoose.Schema({

    userid:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    equipmentname: {
        type:String,
        required: true,
      
    },
    EquipmentCategory: {
        type: String,
        required: true,
       
    },
    quantity: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true,
     },
     Summary: {
        type: String,
        required: true,
     }

    

    
})

function validateEquipment(equipment) {
    const schema = {
        userid: Joi.string().required(),
        equipmentname: Joi.string().required(),
        EquipmentCategory: Joi.string().required(),
        quantity: Joi.string().required(),
        Price: Joi.string().required(),
        Summary:Joi.string().required(),
    
    };
    return Joi.validate(equipment, schema);
}

const Equipment = mongoose.model('Equipment', equipmentSchema);



exports.Equipment = Equipment;
exports.validate = validateEquipment;