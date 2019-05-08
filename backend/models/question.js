/*const mongoose = require('mongoose');

const question = mongoose.Schema(
    {
        qno: String,
        title: String,
        op1: String,
        op2: String,
        op3: String,
        op4: String,
        answer: String
    }
)

module.exports = mongoose.model('question',question);*/

const mongoose = require('mongoose');

const question = mongoose.Schema({

   
        title:{type:String,require:true},
        author: String,
        Description:String,
        options: {type:[String],require:true},
        answer:{type:[String],require:true},
        domain:String,
        keywords:String,
        marks:Number,
        Level:String,
        Type:String,
        Explanation: String,
        collapse_flag: Boolean,
});

module.exports = mongoose.model('question',question);