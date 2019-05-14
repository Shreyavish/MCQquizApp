const mongoose = require('mongoose');

const questionpaperSchema = mongoose.Schema({
    title : String,
    section : [
            {name:String,
            question_content: [{
                type: mongoose.Schema.Types.ObjectId,
                ref : 'Question',
               
            }] 
            }
    ],
    total_marks: Number
});

var quespaper = module.exports = mongoose.model('quespaper',questionpaperSchema);