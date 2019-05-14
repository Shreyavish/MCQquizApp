import {question} from '../models/question';
import {leaderBoard} from '../models/Leaderboard';
import { questionpaper } from './questionpaper';

export class contest{
  _id?:String
  Name: String;
  Start_time: Date;
  End_time: Date;
  Organized_by:String;
  Contest_Link:String;
  Questionpaper: questionpaper;
  Marks?:Number;
  Level?:String;
  LeaderBoard?:[leaderBoard];
  length?:Number;
  active_time?:String;
}




