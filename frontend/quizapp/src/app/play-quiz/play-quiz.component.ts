import { Component, OnInit } from '@angular/core';
import  {QuestionserviceService} from '../service/questionservice.service';
import {question} from '../models/question';
import {ContestService} from '../service/contest.service';
import {contest} from '../models/contest';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css']
})
export class PlayQuizComponent implements OnInit {

  constructor(private queserv: QuestionserviceService, private contserv: ContestService) { }
  contest_id: string;
  user_contest: contest;
  contest_questions :[question];
  user_answers : [{q_id: String,q_ans:[String]}] = [{"q_id":"",q_ans:[" "]}] ;
  contest_answers: [{q_id: String,q_ans:[String]}]= [{"q_id":"",q_ans:[" "]}] ;// initialize with dum
userans: String;
  current_question_no:number =0 ;
  total_no_of_questions: number =0;
  userscore: number=0;

  ngOnInit() {
    this.contest_id = this.contserv.getdata();
    this.contest_answers.pop(); // remove dummy
    this.user_answers.pop(); // remove dummy
    // console.log(this.contest_id);

    this.queserv.getContestById(this.contest_id).subscribe(user_contest=>
      {
        this.user_contest = user_contest;
        this.contest_questions = this.user_contest.Questions;
        this.total_no_of_questions = this.contest_questions.length;
        // storing answers in object array
        for(var i=0;i<this.contest_questions.length;i++){
          let temp_ans = {
            q_id:this.contest_questions[i]._id,
            q_ans:this.contest_questions[i].answer
          }
          this.contest_answers.push(temp_ans);
          console.log(this.contest_answers);
        }
      });

  }

  saveUserAnswer(qid,userans){
    //let flag =false;
    let temp ={
      q_id : qid,
      q_ans:userans
    }
    console.log(temp);
    // check if question is already answered and if user want to change option by toggling between radio button apply below

    /*for(var i =0 ;i<this.user_answers.length;i++){
      flag= false;
      if(qid == this.user_answers[i].q_id){
        this.user_answers[i].q_ans = userans;
        flag = true;
        break;
      }
    }*/
    //if(flag == false){
    this.user_answers.push(temp);
    //}
    console.log(this.user_answers);
  }

  saveAndNext(qid,userans){
    let temp ={
      q_id : qid,
      q_ans:userans
    }
    this.user_answers.push(temp);
    console.log(this.user_answers);
    this.current_question_no = this.current_question_no+1;

  }

  calculateMyScore(){

    for( var i =0; i<this.contest_answers.length;i++){

      for(var j=0;j<this.user_answers.length;j++){
         if(this.contest_answers[i].q_id == this.user_answers[j].q_id){

            if(this.contest_answers[i].q_ans == this.user_answers[i].q_ans){
              this.userscore = this.userscore+1;
              // in case marks are different for diff questions
              // to be coded
            }

         }
      }


    }

    alert('your score is' + this.userscore);
  }


}
