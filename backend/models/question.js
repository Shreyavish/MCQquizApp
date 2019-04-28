const mongoose = require('mongoose');

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

module.exports = mongoose.model('question',question);