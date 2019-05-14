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

const questionSchema = mongoose.Schema({ 
        
        title:{type:String,require:true},
        author: String,
        description:String,
        options: {
            type:[
                {option_no : Number,
                 content: String}
            ],require:true
        },
        answer:{type:[Number],require:true},
        domain:String,
        subdomain: String,
        keywords:[String],//topic tags
        marks:Number,
        level:String,
        type:String,
        explanation: String,
        
});

module.exports = mongoose.model('Question',questionSchema,'question');