import { Component, OnInit } from '@angular/core';
import {QuestionserviceService} from '../service/questionservice.service';
import {question} from '../models/question';
import {ContestService} from '../service/contest.service';

@Component({
  selector: 'app-get-existing-questions',
  templateUrl: './get-existing-questions.component.html',
  styleUrls: ['./get-existing-questions.component.css']
})
export class GetExistingQuestionsComponent implements OnInit {

  constructor(private queserv:QuestionserviceService,private contserv:ContestService) { }
  questions: [question];
  question_selected: question;
  question_selected_array:[question]=[{
    'problem_no': 'x',
      'title':'x',
      'options': [''],
      'answer':'x',
      'domain':'c programming',
      'keywords':['variables'],
      'marks':5,
      'Level':'easy',
      'Type':'mcq'

}] ; // intializing with a dummy question

  qid: String;
  found_flag:boolean = false;
  flag:boolean = false; //flag to remove the empty " " in question selected array;
  contest_id:String;
  ngOnInit() {
    this.queserv.getExistingQuestiond().subscribe(questions =>
      {this.questions=questions;
       console.log(this.questions);
      })
    this.contest_id = this.contserv.getdata2();
  }


   addexistQuesToContest(){
     console.log(this.question_selected_array);

     this.queserv.postExistingQuestions(this.contest_id,this.question_selected_array).subscribe(question_selected_array=>
      console.log('posted to contest successfully'));
   }

pushToQuestionsArray(ques:question){

  if(this.flag == false){
    this.question_selected_array.shift();
    this.flag = true;
  }
  this.question_selected = ques;
  console.log(this.question_selected);
  this.found_flag = false;

  for(let i=0;i<this.question_selected_array.length;i++){
        if(this.question_selected == this.question_selected_array[i]){
          this.question_selected_array.splice(i,1);
          this.found_flag = true;
          break;
        }

    }

  if(this.found_flag == false){
      this.question_selected_array.push(this.question_selected);
      console.log(this.question_selected_array);
    }

  console.log('The current questions are:'+this.question_selected_array.length);

  }

}
