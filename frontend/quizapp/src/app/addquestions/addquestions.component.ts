import { Component, OnInit } from '@angular/core';
import {QuestionserviceService} from '../service/questionservice.service'
import {  question } from '../models/question';
import { contest } from '../models/contest';
import { leaderBoard } from '../models/Leaderboard';
import {Router} from '@angular/router';
import {CalendarModule} from 'primeng/calendar'
import {ContestService} from '../service/contest.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-addquestions',
  templateUrl: './addquestions.component.html',
  styleUrls: ['./addquestions.component.css']
})
export class AddquestionsComponent implements OnInit {

  constructor(private quesservice:QuestionserviceService, private router: Router,private contserv:ContestService) { }

    /*ques: Question;
    length: number;
    question_title: String;
    op1: String;
    op2: String;
    op3: String;
    op4: String;
    answer: String;

  ngOnInit() {
    this.quesservice.getQuestions().subscribe(ques=>
      {this.ques = ques;
        this.length=Object.keys(this.ques).length;
      })
  }




  addtheques(){
  this.length = this.length+1;
  let newQues = {
      qno: this.length.toString(),
      title: this.question_title,
      op1: this.op1,
      op2: this.op2,
      op3: this.op3,
      op4: this.op4,
      answer: this.answer
    }
    this.quesservice.addQuestion(newQues).subscribe( newQues =>
      alert("added question"))


  }*/
  //contest parameters

  contest_id:String;

  //question parameters
  newoption:String;
  problem_no: string = "1";
  title: String;
  options:[String]=[""];
  answer:[String];
  domain:String;
  keywords:[String];
  marks:number;
  Level:String;
  Description: String;
  Questions: [question]=[{
    'problem_no': 'x',
      'title':'x',
      'options': [''],
      'answer':'x',
      'domain':'c programming',
      'keywords':['variables'],
      'marks':5,
      'Level':'easy',
      'Type':'mcq'

}] ; //initializing with dummy question so that undefind error is reslove
  newquestion: question;
  //result parameters

  username: String;
    Rank: Number;
    Score: Number;
    Time_taken: String;

// other calculation parameters

  quizflag=0;
  questionflag=0;
  done=0;
  ans:String;



  ngOnInit(){

    this.Questions.pop();
    this.contest_id= this.contserv.getdata2();
  }



  addAnotherQuestion(title,domain,keywords,answer){

        this.options.shift();
      this.newquestion= {
        problem_no: this.problem_no,
        title:this.title,
        options:this.options,
        domain:this.domain,
        keywords:this.keywords,
        answer:this.ans,
        marks:this.marks,
        Level:this.Level

      }

      let n =this.Questions.push(this.newquestion);
      if(n>0){
        alert('added  question succesfully');
        this.questionflag=1;
      }
      // incrementing the question no/problem no
     // console.log('Questions are ' + this.Questitle);
     // alert('question added successfully');
      console.log('options are'+ this.options);

      parseInt(this.problem_no);
      this.problem_no =this.problem_no+1;
      this.problem_no.toString();
      this.options= [""];


    }

    addOption(newoption){
      console.log(newoption);
      this.options.push(newoption);

      console.log(this.options);
      console.log(this.Description);

    }
      postToContest(){
        /*for(let i=0;i<this.Questions.length;i++){
        console.log("The questions are"+this.Questions[i].title);
        }*/
        this.quesservice.postExistingQuestions(this.contest_id,this.Questions).subscribe(Questions=>
          console.log('posted successfully'));
      }

      change(){
        console.log(this.Description);
      }
  }







