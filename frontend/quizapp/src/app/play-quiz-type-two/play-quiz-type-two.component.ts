import { Component, OnInit } from "@angular/core";
import { questionpaper } from "../models/questionpaper";
import { question } from "../models/question";
import { contest } from "../models/contest";
import { QuestionserviceService } from "../service/questionservice.service";
import { ContestService } from "../service/contest.service";
import { leaderBoard } from "../models/leaderboard";
import { Router } from "@angular/router";
import { stringify } from '@angular/core/src/util';
@Component({
  selector: "app-play-quiz-type-two",
  templateUrl: "./play-quiz-type-two.component.html",
  styleUrls: ["./play-quiz-type-two.component.css"]
})
export class PlayQuizTypeTwoComponent implements OnInit {
  constructor(
    private quesserv: QuestionserviceService,
    private contserv: ContestService,
    private router: Router
  ) {}
  username: String = "";
  questions_of_each_section = [[]];
  our_contest_qpaper_sections = [];
  our_contest_quespaper;
  our_contest = [];
  no_of_sections;
  temp = [[]];
  no_of_ques;
  no_of_ques_of_crnt_section = 0;
  //
  contest_id: string;
  crnt_ques_no = 0;
  crnt_ques = [];
  crnt_ques_id = "";
  crnt_ques_type = "";
  title = "";
  crnt_ques_options = [];
  crnt_section = "";
  question_no_with_id = [];
  array_userans :[number]= [0];
  flag = false; // check if question paper was succesfully loaded from db.If no error make flag true in "get" call of ngoninit
  // tslint:disable-next-line:variable-name
  /*checbox_options : [
    {qid:string,
    options : [{
      option_no:number;
      checked : boolean;
    }],
    }
  ] = [{qid: "",options:[{option_no:0,checked:false}]}];*/

// for checkboxes and radio buttons
  temp_user_answers: [{ qid: string; ans: [number] }] = [{ qid: "", ans: [0] }];
  actual_answers: [{ id: string; ans: [number] }] = [{ id: "", ans: [0] }];
  // for fill in the blanks

  fib_temp_user_answers: [{ qid: string; ans: [string] }] = [{ qid: "", ans: [""] }];
  fib_actual_answers: [{ id: string; ans: [string] }] = [{ id: "", ans: [""] }];
  fib_ans_with_qno:[[string]]= [[""]];// to print no of text fields

  is_question_attempted : [{qno:number, flag:boolean}] = [{qno:0,flag:false}];
  total_no_ques_contest = 0;
  no_of_ques_attempted_by_user = 0;
  is_quesno_attempted :[boolean]= [false];
  posting_res_first_time_flag = true;
  temp_user_result_object ;
  temp_user_result_id;
  sum_of_scores =0 ;

  make_final_submission = false;
  ngOnInit() {
     //remove dummy
    this.temp_user_answers.pop();
    this.actual_answers.pop();
    //this.fib_temp_user_answers.pop();
    this.fib_actual_answers.pop();
    this.array_userans.pop();
    this.sum_of_scores = 0;
    var qno = 0;
    this.contest_id = this.contserv.getdata();
    this.quesserv.getContestById(this.contest_id).subscribe(cont => {
      console.log(cont);
      this.our_contest = cont;
      this.our_contest_quespaper = cont.questionpaperid;
      this.our_contest_qpaper_sections = cont.questionpaperid.section;
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
          // textbox and radio
          var actans = {
            id: this.our_contest_qpaper_sections[i].question_content[j]._id,
            ans: this.our_contest_qpaper_sections[i].question_content[j].answer
          };
          this.actual_answers[qno] = actans;




            if(this.our_contest_qpaper_sections[i].question_content[j].type == "text"){
              var actans2 = {
                id: this.our_contest_qpaper_sections[i].question_content[j]._id,
                ans: this.our_contest_qpaper_sections[i].question_content[j].text_answer
              };
              this.fib_actual_answers[qno] = actans2;
              this.fib_temp_user_answers[qno].qid = this.our_contest_qpaper_sections[i].question_content[j]._id;
              this.fib_temp_user_answers[qno].ans = [""];
            }



          qno = qno + 1;
        }
      }
      this.total_no_ques_contest = qno;


      // initially no question is attempted
      for(var i =0;i<this.total_no_ques_contest;i++){
        this.is_quesno_attempted[i] = false;
      }

      console.log(this.total_no_ques_contest);
      console.log(this.actual_answers);
      console.log(this.question_no_with_id);

      //at start of the test display first question of first section
      this.crnt_section = this.our_contest_qpaper_sections[0]._id;
      this.crnt_ques = this.our_contest_qpaper_sections[0].question_content[0];
      this.crnt_ques_id =this.our_contest_qpaper_sections[0].question_content[0]._id;
      this.crnt_ques_options = this.our_contest_qpaper_sections[0].question_content[0].options;
      this.flag = true;
    });
  }

  displayQuestions() {}

  fetchQuestion(qid, sid, crntquesno) {

    // when fetching next question clear this array because when the users save it the score will be stored in db and also their temp answeres are there in temp user answers on Frontend

    this.array_userans = [0];
    this.array_userans.pop();

  // start fetching
    this.flag = true;
    this.crnt_ques_no = crntquesno;
    for (var i = 0; i < this.no_of_sections; i++) {
      if (sid == this.our_contest_qpaper_sections[i]._id) {
        console.log("found sid");
        this.no_of_ques_of_crnt_section = this.our_contest_qpaper_sections[
          i
        ].question_content.length;
        this.crnt_section = sid;
        for (var j = 0; j < this.no_of_ques; j++) {
          if (
            this.our_contest_qpaper_sections[i].question_content[j]._id == qid
          ) {
            console.log("found qid");
            this.crnt_ques = this.our_contest_qpaper_sections[
              i
            ].question_content[j];
            this.crnt_ques_id = this.our_contest_qpaper_sections[
              i
            ].question_content[j]._id;
            this.crnt_ques_options = this.our_contest_qpaper_sections[
              i
            ].question_content[j].options;
            break;
          }
        }
      }
    }
  }

  displayQuestionNumbers(sid) {
    for (var i = 0; i < this.no_of_sections; i++) {
      if (this.our_contest_qpaper_sections[i]._id == sid) {
        break;
      }
    }

    this.no_of_ques_of_crnt_section = Object.keys(
      this.our_contest_qpaper_sections[i].question_content
    ).length;
  }


  saveTempAnswers(userans, qid,type,ischecked) {
    console.log(type);


      var check_flag = false;// flag to check if that question is getting answered first time or are changes being made
      for(var i=0;i<this.temp_user_answers.length;i++){

        check_flag = false;
          if(this.temp_user_answers[i].qid == qid){
            check_flag = true;

            if(type== "radio"){
             // this.temp_user_answers[i].ans = [0];
              this.temp_user_answers[i].ans.pop();
              this.temp_user_answers[i].ans.push(userans);
              console.log(this.temp_user_answers[i]);
              }
              else if(type=="checkbox"){

                if(ischecked == true){
                  this.temp_user_answers[i].ans.push(userans);
                }else{
                  for(var j =0 ;j<this.temp_user_answers[i].ans.length;j++){
                    if(userans == this.temp_user_answers[i].ans[j]){
                      this.temp_user_answers[j].ans.splice(j,1);
                    }
                  }
                }

              }else{


              }
              break;
          }

      }
      // question is being answered first time . create an object and push into temp_user_answer
      if(check_flag == false){






       var temp : {qid:string,ans:[number]}={qid:"",ans:[0]};
      temp.ans.pop();

       temp.qid = qid;
       temp.ans.push(userans);

        this.temp_user_answers.push(temp);
        this.no_of_ques_attempted_by_user = this.no_of_ques_attempted_by_user + 1;

      }



    console.log(this.temp_user_answers);


  }



  save_temp_fib_ans(qid,userans,i){

    var check_flag2 = false;

    for(var k=0;k<this.fib_temp_user_answers.length;k++){
      check_flag2 = false;

      if(this.fib_temp_user_answers[k].qid == qid){
        this.fib_temp_user_answers[k].ans[i] = userans;
        check_flag2 = true;
        break;
      }

    }

    if(check_flag2 == false){

      var temp : {qid:string,ans:[string]}={qid:"",ans:[""]};
      temp.ans.pop();

       temp.qid = qid;
       temp.ans[i] = userans;

        this.fib_temp_user_answers[this.crnt_ques_no]= temp;


    }
    console.log(this.fib_temp_user_answers);

    // calculating the score here itself

    }



  save_temp_ans_to_db(){


    if(this.posting_res_first_time_flag == true){

      this.calculateScore();
      this.calculateScoreforFIB();
      this.update_user_result();
        this.quesserv.postResultFirstTime(this.temp_user_result_object).subscribe(res=>
          {this.temp_user_result_id = res._id;
            console.log(res);
            console.log(this.crnt_ques_no);
            this.is_quesno_attempted[this.crnt_ques_no] = true;
            this.posting_res_first_time_flag = false;

            this.array_userans = [0];
            this.array_userans.pop();// make array empty so that next question's answers would not get pushed rather they should be int0 new array
          });
      }
      else{

        this.calculateScore();
        this.calculateScoreforFIB();
        this.update_user_result();
        this.quesserv.postTempResult(this.temp_user_result_object,this.temp_user_result_id).subscribe(res=>
          {console.log(res)
            this.is_quesno_attempted[this.crnt_ques_no] = true;});

            this.array_userans = [0];
            this.array_userans.pop(); // make array empty so that next question's answers would not get pushed rather they should be int0 new array
        }


  }


  getNextQuestion(qid) {
    for (var i = 0; i < this.question_no_with_id.length; i++) {
      if (qid == this.question_no_with_id[i]) {

        break;
      }
    }
    // increment the question no because next question has +1 qno


    this.fetchQuestion(this.question_no_with_id[i+1], this.crnt_section, i+1);
  }

  getPreviousQuestion(qid) {
    for (var i = 0; i < this.question_no_with_id.length; i++) {
      if (qid == this.question_no_with_id[i]) {

        break;
      }
    }
    // decrement the question no because previous question has -1 qno


    this.fetchQuestion(this.question_no_with_id[i+1], this.crnt_section, i-1);
  }

  calculateScore() {
    var mcq_score=0;
    var compareAnswers = false;

    for (var i = 0; i < this.no_of_ques_attempted_by_user; i++) {
      for (var j = 0; j < this.total_no_ques_contest; j++) {
        if (this.temp_user_answers[i].qid == this.actual_answers[j].id) {
          console.log("entered id");

          compareAnswers = this.compare(
            this.temp_user_answers[i].ans,
            this.actual_answers[j].ans
          );

          if (compareAnswers == true) {
           // console.log("enteres ans");
            mcq_score =mcq_score + 1;
            console.log('the mcq score is '+ mcq_score);
          }
          break; // question already found so stop looping
        }
      }
    }
    //alert("your score is " + score);
    this.sum_score(mcq_score);
  }

  //compare arrays of user answers
  compare(arr1, arr2) {
    arr1.sort();
    arr2.sort();
    console.log(arr1);
    console.log(arr2);

    if(arr1.length != arr2.length){
      return false;
    }
    for (var i = 0; i < arr1.length; i++) {
     // for (var j = 0; j < arr1.length; j++) {
        if (arr1[i] != arr2[i]) {
          return false;
        }
      //}
    }
    return true;
  }

  calculateScoreforFIB(){

    var fib_score =0;
    var flag=false ;// to break the loop

    console.log(this.fib_actual_answers);
    console.log(this.fib_temp_user_answers);
    for(var l =0;l<this.fib_temp_user_answers.length;l++){
      flag =false;
      for(var m=0;m<this.fib_actual_answers.length;m++){

      if(this.fib_temp_user_answers[l].qid == this.fib_actual_answers[m].id){
      flag = true;
          break;
      }
    }

    if(flag == true){
      break;
    }
  }

      console.log(l);
      console.log(m);
      var ismatched = this.compare_fib_answers(this.fib_actual_answers[l].ans,this.fib_temp_user_answers[m].ans)
      {
        console.log('entered');
        console.log(ismatched);
        if(ismatched == true)
        {
          fib_score = fib_score +1;

        }
      }
      console.log('fib the score is '+fib_score);
      this.sum_score(fib_score);


  }

  compare_fib_answers(arr1,arr2){

    for(var i=0;i<arr1.length;i++){
      if(arr1[i] != arr2[i]){
        return false;
      }

    }
    return true;

  }

  // make the sum of scores of fill in the blank type question and mcq type question
  sum_score(x){

    this.sum_of_scores = this.sum_of_scores+x;

  }


  update_user_result() {

    // if final submission is not to be made yet just create a user result object and store in temp_user_resullt object so that temp answers will get stored in just leaderboard not content schema.This updating is done through save_temp_db function
    var userresult = new leaderBoard();
    userresult.username = this.contserv.getusername();
    userresult.no_of_questions_attempted = this.no_of_ques_attempted_by_user;
    userresult.score = this.sum_of_scores;
  //  userresult.user_answers = this.temp_user_answers;
    userresult.time_taken = "n hrs";
    this.temp_user_result_object = userresult;

      // if finally submission is made then update into actual db
    if(this.make_final_submission == true){
    this.quesserv
      .postResult(userresult, this.contest_id)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(["/userlanding"]);
      });
    }
  }

  promptMessageToUser() {
    if (this.no_of_ques_attempted_by_user == this.total_no_ques_contest) {
      this.make_final_submission = true;
      this.calculateScore();

    } else {
      if (this.no_of_ques_attempted_by_user < this.total_no_ques_contest) {
        var input = prompt(
          "You some questions left unanswered.Do you still wish to end the test? (Y/N)"
        );
      }

      if (input == 'Y' || input == 'y') {
        this.make_final_submission = true;
        this.update_user_result();

      }
    }
  }
}
