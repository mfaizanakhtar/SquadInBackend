const mongoose = require('mongoose');

const NotifcationSchema = mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String
    },
    seen:{
        type:Boolean,
        default:false
    }

})

const Notification = mongoose.model('Notification',NotifcationSchema);

exports.Notification = Notification
