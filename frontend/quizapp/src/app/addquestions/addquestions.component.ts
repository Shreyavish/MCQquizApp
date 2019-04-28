import { Component, OnInit } from '@angular/core';
import {QuestionserviceService} from '../service/questionservice.service'
import { Question } from '../models/question';
@Component({
  selector: 'app-addquestions',
  templateUrl: './addquestions.component.html',
  styleUrls: ['./addquestions.component.css']
})
export class AddquestionsComponent implements OnInit {

  constructor(private quesservice:QuestionserviceService) { }

    ques: Question;
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


  }

}
