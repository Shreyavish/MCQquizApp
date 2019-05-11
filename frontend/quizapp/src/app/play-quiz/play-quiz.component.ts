import { Component, OnInit } from '@angular/core';
import  {QuestionserviceService} from '../service/questionservice.service';
import {question} from '../models/question';
import {ContestService} from '../service/contest.service';
import {contest} from '../models/contest';
import { timer } from 'rxjs';

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
  percentage_completed: number = 0;

  Start_time : Date;
  End_time: Date;
  // timer data
  active_time:String;
  nmin: number= 0;
  no_hrs : number;
  no_min: number ;
  flag:boolean = false;


  ngOnInit() {

    this.contest_id = this.contserv.getdata();
    this.contest_answers.pop(); // remove dummy
    this.user_answers.pop(); // remove dummy
    // console.log(this.contest_id);

    this.queserv.getContestById(this.contest_id).subscribe(user_contest=>
      {
        this.user_contest = user_contest;
        console.log(this.user_contest);
        this.contest_questions = this.user_contest.Questions;
        this.total_no_of_questions = this.contest_questions.length;
        this.Start_time = new Date(this.user_contest.Start_time);
        this.End_time = new Date(this.user_contest.End_time);
        this
        // storing answers in object array
        for(var i=0;i<this.contest_questions.length;i++){
          let temp_ans = {
            q_id:this.contest_questions[i]._id,
            q_ans:this.contest_questions[i].answer
          }
          this.contest_answers.push(temp_ans);
          console.log(this.contest_answers);
        }
        //this.no_hrs = parseInt(this.active_time.substr(0,2));
        //this.no_min = parseInt(this.active_time.substr(3,2));
        console.log(this.no_hrs);
        this.startTimer();
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
    this.percentage_completed = this.current_question_no /this.total_no_of_questions;
    this.percentage_completed = this.percentage_completed * 100;
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


    startTimer(){

      var day= this.End_time.getDate()- this.Start_time.getDate();
      var month = this.End_time.getMonth() - this.Start_time.getMonth();
      var year = this.End_time.getFullYear() - this.Start_time.getFullYear();


      var hours_left = this.End_time.getHours() - this.Start_time.getHours();
      var min_left = this.End_time.getMinutes() - this.Start_time.getMinutes();
      var sec_left = this.End_time.getSeconds() - this.Start_time.getSeconds();

      var time_left = day + ' '+month + ' '+year+ ''+hours_left+' '+min_left+' '+sec_left;
      console.log(time_left);
      var one_day=1000*60*60*24;

      var time = this.Start_time.getTime() - this.End_time.getTime();
     console.log( Math.round(time/one_day));

     this.no_hrs = hours_left;
     this.no_min = min_left;


    }
}

