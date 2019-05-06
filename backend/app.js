var express = require('express')
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var app= express();
var router = require('./routes/route')
var cors = require('cors');

app.get('/',(req,res) => res.send('hello new world!'));
const port=3000;

app.use(cors());

//bodyparser
app.use(bodyparser.json());



mongoose.connect('mongodb://localhost:27017/mcqquiz');

mongoose.connection.on('connected',()=>{
    console.log("connected to database at port 27017");
});

mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('error in connection to database'+err);
    }
});
app.use('/quizapi',router);
//testing server
 app.listen(port, () =>
     console.log('server started at 3000 '));
module.exports = app;
