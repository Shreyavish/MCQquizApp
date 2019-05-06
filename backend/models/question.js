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

    problem_no: {type:String, require:true},
        title:{type:String,require:true},
        author: String,
        Description:String,
        q_img: String,
        options: {type:[String],require:true},
        answer:{type:[String],require:true},
        domain:String,
        keywords:[String],
        marks:{type:Number,require:true},
        Level:String,
        Type:String
});

module.exports = mongoose.model('question',question);