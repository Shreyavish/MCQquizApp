/*const mongoose = require('mongoose');

const userresult = mongoose.Schema(
    {
     username : String,
     result : String
    }
)

module.exports = mongoose.model('userresult',userresult);
///////before///////// 
*/

const mongoose = require('mongoose');

const leaderboard = mongoose.Schema({
    contest_id :{type:String,require:true},
    username:{type:String,require:true},
    no_of_questions_attempted : Number,
  /* user_answers :[{
        qid: String,
        ans: [Number | String]
    }],*/
    score:{type:Number,require:true},
    time_taken: {type:String,require:true},
});

module.exports = mongoose.model('leaderboard',leaderboard);