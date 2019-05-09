import { Component, OnInit } from '@angular/core';
import {QuestionserviceService} from '../service/questionservice.service';
import {ContestService} from '../service/contest.service';
import { question} from '../models/question';
import {contest} from '../models/contest';
import {timer} from 'rxjs';
import {Router} from '@angular/router';
@Component({
  selector: 'app-questioncomp',
  templateUrl: './questioncomp.component.html',
  styleUrls: ['./questioncomp.component.css']
})
export class QuestioncompComponent implements OnInit {

  constructor(private quesserv:QuestionserviceService,private contestserv:ContestService,private router:Router) { }

  //class variables
  quesarray:[question];
  queslength:number;
  userContest:contest;
  options:[String];
  flag_uname:number=0;
  // on intialization get questions of particular contest where contest id is supplies
  // as paramter in getQuestions(id)
  contest_id:String;
  ngOnInit(){
    this.contest_id=this.contestserv.getdata();
    console.log(this.contest_id);
    this.quesserv.getQuestions(this.contest_id).subscribe(userContest=>
      {this.userContest = userContest;
        console.log(this.userContest);
      //  this.queslength=Object.keys(this.ques).length;
        //this.quesarray.push(this.ques);
        //console.log(this.quesarray);
        this.quesarray= userContest.Questions;
        this.queslength=Object.keys(this.quesarray).length;
        console.log('the questions are'+this.quesarray[0].options);
      }
       );


  }
  //quesarray : Question[] = new Array();
  //ques: question;
 // options: [String];
  option:String;
  result: number=0;
  displayScore : String;
  n:number=0;
 // length: number;
  subscribeTimer:number;
  timeLeft:number=60;
  username: String;
flag:number=0;
quesNo:number=0;
finishflag:number=0;
flag_leaderboard:number=0;
 /* ngOnInit() {



    this.quesserv.getQuestions().subscribe(ques=>
      {this.ques = ques;
        console.log(this.ques);
        this.length=Object.keys(this.ques).length;
        //this.quesarray.push(this.ques);
        //console.log(this.quesarray);

      }
       );




  }*/

  getQuestion(){

  this.quesNo++;
    /* for(no=0; no<3;no++){
           console.log(this.ques[no].answer);
     }*/

   /*  console.log('the length is '+ this.length);
     console.log(this.ques[this.n].title);
     console.log(this.option);*/

      var useranswer= this.option;
      var actualanswer= this.quesarray[this.n].answer;
     console.log(useranswer);
     console.log(actualanswer);
     //if(useranswer === actualanswer){
       // this.result = this.result+1;
      //}
     this.n=this.n+1;

     // calculating score

     if (this.n>= this.queslength) {
       this.finishflag=1;
      console.log('the result is '+ this.result);
     }

  }

calculateScore(){
this.finishflag=1;
  alert('Your score is '+ this.result);
  this.postResult();

}
  postResult(){

    let userresult = {
      username : this.username,
      Score: this.result,
      Time_taken:'10 min'

    }

    this.quesserv.postResult(userresult,this.contest_id).subscribe(userresult =>
      {console.log(userresult);
      this.flag_leaderboard=1;
      })

  }


  fetchusername(username){
    this.username= username;
    this.flag=1;
    this.flag_uname=1;
    const source = timer(1000, 1000);
    const abc = source.subscribe(val => {
     // console.log(val, '-');
      this.subscribeTimer = this.timeLeft - val;
    });
  }


  showLeaderboard(){

    this.router.navigate(['/leaderboard']);

  }

}
