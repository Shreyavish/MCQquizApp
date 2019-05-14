const mongoose = require('mongoose');
const mongooseDateFormat = require('mongoose-date-format');
const question = require('../models/question').schema;
const leaderBoard = require('../models/leaderboard').schema;
const quespaper = require('../models/questionpaper').schema;
const contest = mongoose.Schema ({
    Name: {type:String,require:true},
    Start_time: 
    {type:Date, require:true},
    End_time : {type:Date,require:true},
    Organized_by: {type:String,require:true},
    Contest_Link:{type: String},
    no_of_attempts: String,
    // test and contest
    //Questions:{type:[question]},// qpaper id
    questionpaperid:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'quespaper'},
    Marks: Number,
    Level: String,
    LeaderBoard:{type:[leaderBoard]},
    length:Number,
    active_time: String
});
contest.plugin(mongooseDateFormat);
module.exports=mongoose.model('Contest',contest);