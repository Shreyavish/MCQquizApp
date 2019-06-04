export class leaderBoard{

  username:String;
  no_of_questions_attempted : Number;
  user_answers :[{
      qid: string,
      ans: [number]
  }];
  score:Number;
  time_taken: String;
  contest_id: String;

}
