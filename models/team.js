var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema( {

    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    teamname: {
        type: String,
    },
    teammembers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        
    }],
});

const Team = mongoose.model('team', teamSchema);

module.exports.Team = Team;