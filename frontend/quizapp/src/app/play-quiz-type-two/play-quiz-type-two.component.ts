import { Component, OnInit } from "@angular/core";
import { questionpaper } from "../models/questionpaper";
import { question } from "../models/question";
import { contest } from "../models/contest";
import { QuestionserviceService } from "../service/questionservice.service";
@Component({
  selector: "app-play-quiz-type-two",
  templateUrl: "./play-quiz-type-two.component.html",
  styleUrls: ["./play-quiz-type-two.component.css"]
})
export class PlayQuizTypeTwoComponent implements OnInit {
  constructor(private quesserv: QuestionserviceService) { }
  questions_of_each_section = [[]];
  our_contest_qpaper_sections;
  our_contest_quespaper;
  our_contest=[];
  no_of_sections;
  temp = [[]];
  no_of_ques;
  no_of_ques_of_crnt_section = 0;
  //
  crnt_ques_no = 0;
  crnt_ques=[];
  title = "";
  crnt_ques_options = [];
  crnt_section = "";
  question_no_with_id = [];
  flag = false;// for displaying next and previous buttons
  // tslint:disable-next-line:variable-name
  temp_user_answers :[{id:string,ans:[number]}]=[{id:'',ans:[0] }];
  actual_answers: [{id:string,ans:[number]}]=[{id:'',ans:[0] }];
  total_no_ques_contest =0;
  ngOnInit() {
    this.temp_user_answers.pop();//remove dummy
    this.actual_answers.pop();
    var qno =0;
    this.quesserv.getContestById("5cda5df743b7995dc01c18cc").subscribe(cont => {
      this.our_contest = cont;
      this.our_contest_quespaper = cont.questionpaperid;
      this.our_contest_qpaper_sections = this.our_contest_quespaper.section;
      console.log(this.our_contest_qpaper_sections);
      this.no_of_sections = Object.keys(
        this.our_contest_quespaper.section
      ).length;
      console.log(this.no_of_sections);
      console.log(this.our_contest);

      for (var i = 0; i < this.no_of_sections; i++) {
        this.no_of_ques = Object.keys(
          this.our_contest_qpaper_sections[i].question_content
        ).length;
        console.log(this.no_of_ques);

        for (var j = 0; j < this.no_of_ques; j++) {
          this.question_no_with_id[qno] = this.our_contest_qpaper_sections[i].question_content[j]._id;
          var actans = {
            id:this.our_contest_qpaper_sections[i].question_content[j]._id,
            ans:this.our_contest_qpaper_sections[i].question_content[j].answer
          }
          this.actual_answers[qno] = actans;

          qno= qno+1;
        }
      }
      this.total_no_ques_contest = qno;
      console.log(this.total_no_ques_contest);
      console.log(this.actual_answers);
      console.log(this.question_no_with_id);
    });
  }

  displayQuestions() { }

  fetchQuestion(qid, sid, crntquesno) {
    this.flag=true;
    this.crnt_ques_no = crntquesno;
    for (var i = 0; i < this.no_of_sections; i++) {
      if (sid == this.our_contest_qpaper_sections[i]._id) {
        console.log('found sid');
        this.crnt_section =sid;
        for (var j = 0; j < this.no_of_ques; j++) {
          if(this.our_contest_qpaper_sections[i].question_content[j]._id == qid){
            console.log('found qid');
            this.crnt_ques = this.our_contest_qpaper_sections[i].question_content[j];
            this.crnt_ques_options = this.our_contest_qpaper_sections[i].question_content[j].options;
            break;
          }
         }
      }
    }
  }


displayQuestionNumbers(sid){

  for(var i=0;i<this.no_of_sections;i++){
    if(this.our_contest_qpaper_sections[i]._id == sid){
      break;
    }
  }

  this.no_of_ques_of_crnt_section = Object.keys(
    this.our_contest_qpaper_sections[i].question_content
  ).length;


}

  saveTempAnswers(userans,qid){
    var array_userans:[number]=[0];
    array_userans.pop();
    array_userans.push(userans)
    console.log(array_userans);
var flag=false;
      for(var i=0;i<this.temp_user_answers.length;i++){
        flag= false;

        if(this.temp_user_answers[i].id == qid){
          this.temp_user_answers[i].ans= array_userans;
          flag= true;
          break;
        }
      }
      if(flag == false){
        let temp = {
          id: qid,
          ans:array_userans
        }
        this.temp_user_answers.push(temp);
      }
      console.log(this.temp_user_answers);
    }


    getNextQuestion(qid){
      for(var i=0;i<this.question_no_with_id.length;i++){
          if( qid == this.question_no_with_id[i]){
            break;
          }
      }
      // increment the question no because next question has +1 qno
      i=i+1;
      this.fetchQuestion(this.question_no_with_id[i],this.crnt_section,i);
    }

    getPreviousQuestion(qid){
      for(var i=0;i<this.question_no_with_id.length;i++){
          if( qid == this.question_no_with_id[i]){
            break;
          }
      }
      // decrement the question no because previous question has -1 qno
      i=i-1;
      this.fetchQuestion(this.question_no_with_id[i],this.crnt_section,i);
    }

    calculateScore(){

    var score =0;

    for(var i=0;i<this.total_no_ques_contest;i++){

      if(this.temp_user_answers[i].id == this.actual_answers[i].id){
        if(this.temp_user_answers[i].ans == this.actual_answers[i].ans){
          score =score+1;
        }
        }
        alert(score);
    }


    }



}

