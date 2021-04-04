const config = require('config');
 const Joi = require('joi');
 const mongoose = require('mongoose');
 const express = require ('express');
const { connected } = require('process');
const auth = require('./routes/auth');
const users = require('./routes/users');
const stats = require('./routes/stats');
const equipments = require('./routes/equipments');
const events = require('./routes/events');
const messages = require('./routes/messages');
const feeds = require('./routes/feeds');
const socket = require('socket.io');
const activityResponse = require('./routes/activityresponses');
const { disableDebugTools } = require('@angular/platform-browser');
const bodyParser = require('body-parser');
var cors = require('cors');


email=[];
dsv=[];
creative=[];

const app =express();
if (!config.get("jwtPrivateKey")) {
    console.error("FATAL Error: JWT Private is not defined." );
    process.exit(1);
}

mongoose.connect(config.connectionstring,function() {

    console.log("Connected to Squad In CMS")
    var io = socket(server);

    io.on('connection',function(socket){
        console.log('New connection made!',socket.id);
        
        socket.on('new user',function(data){
            socket.join(data.room);
            if(data.room == 'Email marketing'){
                socket.nickname1 = data;
                email.push(socket.nickname1);
                console.log('Email',email);
                io.in(data.room).emit('usernames',email);
            }
            else if (data.room == 'Dsv & Preview') {
                socket.nickname2 = data;
                dsv.push(socket.nickname2);
                console.log('Dsv', dsv);
            io.in(data.room).emit('usernames', dsv);
            } 
            else {
                socket.nickname3 = data;
                creative.push(socket.nickname3);
                console.log('Creative', creative);
            io.in(data.room).emit('usernames', creative);
            }
        })
    
        socket.on('disconnect',function(data) {
            console.log('disconnected',socket.id);
            var forEmail = email.indexOf(socket.nickname1);
            var forDsv = email.indexOf(socket.nickname2);
            var forCreative = email.indexOf(socket.nickname3);
    
            if(forEmail !== -1){
                email.splice(forEmail,1);
                io.in('Email Marketing').emit('usernames',email);
            }
            else if(forDsv !== -1){
                dsv.splice(forDsv,1 )
                io.in('Dsv & Preview').emit('usernames',dsv)
            }
            else if(forCreative !== -1){
                creative.splice(forCreative,1);
                io.in('Creative').emit('usernames',creative);
            }
        })
    
        socket.on('join',function(data){
            console.log("Hello");
            socket.join(data.room);
            console.log(data.user + ' Joined the room:- ' + data.room);
            socket.broadcast.to(data.room).emit('new User Joined',{user: data.user,message:'has joined this room !'});
    
        });
    
        socket.on('leave',function(data){
            console.log(data.user + ' left the room:- ' + data.room)
            socket.broadcast.to(data.room).emit('left room',{user:data.user,message:'has left this room'});
            socket.leave(data.room);
            if(data.room=='Email marketing')
            {
                socket.nickname1 = data;
                email.pop(socket.nickname1);
                console.log('Email',email);
                io.in(data.room).emit('Usernames',email);
            }
            else if (data.room == 'Dsv & Preview') {
                socket.nickname2 = data;
                dsv.pop(socket.nickname2);
                console.log('Dsv', dsv);
            io.in(data.room).emit('usernames', dsv);
            } 
            else {
                socket.nickname3 = data;
                creative.pop(socket.nickname3);
                console.log('Creative', creative);
            io.in(data.room).emit('usernames', creative);
            }
        });
    
        socket.on('message',function(data){
            var d = new Date();
    
            io.in(data.room).emit('new message',{user:data.user,message:data.message,time: data.Time});
    
        });
    
        socket.on('typing',function(data){
            console.log(data.user + 'typing in room:-' + data.room);
            socket.broadcast.to(data.room).emit('user typing',{user:data.user,message:'user is typing ...!!'});
    
        });
    
    });

}
)












app.use(express.json());
app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader('Access-Control-Allow-Methods',"PUT, GET, POST, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Origin", "*"); // keep this if your api accepts cross-origin requests
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, auth-token");
        next();
    }
)
app.use(bodyParser.json());
app.use(cors());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/stats',stats);
app.use('/api/equipments',equipments);
app.use('/api/events',events);
app.use('/api/messages',messages);
app.use('/api/feed',feeds);
app.use('/api/activityResponses',activityResponse)



const port = process.env.PORT || 3000;
var server = app.listen(port, ()=> console.log(`Listening on port ${port}`));