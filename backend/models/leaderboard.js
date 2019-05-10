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
    username:{type:String,require:true},
    //Rank:{type:Number},
    Score:{type:Number,require:true},
    Time_taken: {type:String,require:true},
});

module.exports = mongoose.model('leaderboard',leaderboard);