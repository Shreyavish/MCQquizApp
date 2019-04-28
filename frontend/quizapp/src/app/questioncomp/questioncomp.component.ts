import { Component, OnInit } from '@angular/core';
import {QuestionserviceService} from '../service/questionservice.service';
import { Question} from '../models/question';
@Component({
  selector: 'app-questioncomp',
  templateUrl: './questioncomp.component.html',
  styleUrls: ['./questioncomp.component.css']
})
export class QuestioncompComponent implements OnInit {

  constructor(private quesserv:QuestionserviceService) { }


  //quesarray : Question[] = new Array();
  ques: Question;
  option: String;
  result: number=0;
  displayScore : String;
  n=0;
  length: number;
  ngOnInit() {
    this.quesserv.getQuestions().subscribe(ques=>
      {this.ques = ques;
        console.log(this.ques);
        this.length=Object.keys(this.ques).length;
        //this.quesarray.push(this.ques);
        //console.log(this.quesarray);

      }
       );

  }

  getQuestion(){

//    this.quesNo++;
    /* for(no=0; no<3;no++){
           console.log(this.ques[no].answer);
     }*/
     console.log('the length is '+ this.length);
     console.log(this.ques[this.n].title);
     console.log(this.option);
      var useranswer= this.option;
      var actualanswer= this.ques[this.n].answer;

     if(useranswer === actualanswer){
        this.result = this.result+1;
      }
     this.n=this.n+1;

     // calculating score

     if (this.n>= this.length) {
      console.log('the result is '+ this.result);
     }

  }
calculateScore(){

  alert('Your score is '+ this.result);

}


}
