import {question} from '../models/question';
import {leaderBoard} from '../models/Leaderboard';

export class contest{
  _id?:String
  Name: String;
  Start_time: Date;
  End_time: Date;
  Organized_by:String;
  Contest_Link:String;
  Questions?: [question];
  Marks?:Number;
  Level?:String;
  LeaderBoard?:[leaderBoard];
  length?:Number;
  active_time?:String;
}




