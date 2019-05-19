import { Component, OnInit } from "@angular/core";
import { questionpaper } from "../models/questionpaper";
import { question } from "../models/question";
import { contest } from "../models/contest";
import { QuestionserviceService } from "../service/questionservice.service";
import { ContestService } from "../service/contest.service";
import { leaderBoard } from "../models/leaderboard";
import { Router } from "@angular/router";
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


  temp_user_answers: [{ qid: string; ans: [number] }] = [{ qid: "", ans: [0] }];
  actual_answers: [{ id: string; ans: [number] }] = [{ id: "", ans: [0] }];
  is_question_attempted : [{qno:number, flag:boolean}] = [{qno:0,flag:false}];
  total_no_ques_contest = 0;
  no_of_ques_attempted_by_user = 0;
  is_quesno_attempted :[boolean]= [false];
  posting_res_first_time_flag = true;
  temp_user_result_object ;
  temp_user_result_id;
  make_final_submission = false;
  ngOnInit() {
    this.temp_user_answers.pop(); //remove dummy
    this.actual_answers.pop();
    this.array_userans.pop();
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

          var actans = {
            id: this.our_contest_qpaper_sections[i].question_content[j]._id,
            ans: this.our_contest_qpaper_sections[i].question_content[j].answer
          };
          this.actual_answers[qno] = actans;

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
   // console.log(userans);

      /*if(type= "checkbox"){
        var flag=false;
       for(var i=0;i<this.array_userans.length;i++){
          flag = false;
          console.log(this.array_userans[i]);
          console.log(userans);
          if(this.array_userans[i] == userans){
            console.log("already checked");
            this.array_userans.splice(i,1);
            flag = true;
            break;

          }
        }

        if(flag == false){
      this.array_userans.push(userans);
      console.log(this.array_userans);
        }
      }*/

       if(type== "radio"){
        this.array_userans = [0];
        this.array_userans.pop();
        this.array_userans.push(userans);
        console.log(this.array_userans);
        }
        else if(type=="checkbox"){

          if(ischecked == true){
            this.array_userans.push(userans);
          }else{
            for(var i =0 ;i<this.array_userans.length;i++){
              if(userans == this.array_userans[i]){
                this.array_userans.splice(i,1);
              }
            }
          }

        }else{


        }

    var flag = false;
    for (var i = 0; i < this.temp_user_answers.length; i++) {
      flag = false;

      if (this.temp_user_answers[i].qid == qid) {
        this.temp_user_answers[i].ans = this.array_userans;
        flag = true;
        break;
      }
    }
    if (flag == false) {
      let temp = {
        qid: qid,
        ans: this.array_userans
      };
      this.temp_user_answers.push(temp);
      this.no_of_ques_attempted_by_user = this.no_of_ques_attempted_by_user + 1;
    }
    console.log(this.temp_user_answers);


  }

  save_temp_ans_to_db(){


    if(this.posting_res_first_time_flag == true){

      this.calculateScore();
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

    i = i + 1;
    this.fetchQuestion(this.question_no_with_id[i], this.crnt_section, i);
  }

  getPreviousQuestion(qid) {
    for (var i = 0; i < this.question_no_with_id.length; i++) {
      if (qid == this.question_no_with_id[i]) {
        break;
      }
    }
    // decrement the question no because previous question has -1 qno

    i = i - 1;
    this.fetchQuestion(this.question_no_with_id[i], this.crnt_section, i);
  }

  calculateScore() {
    var score = 0;
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
            console.log("enteres ans");
            score = score + 1;
          }
          break; // question already found so stop looping
        }
      }
    }
    //alert("your score is " + score);
    this.updateContestLeaderboard(score);
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

  updateContestLeaderboard(userscore) {
    var userresult = new leaderBoard();
    userresult.username = this.contserv.getusername();
    userresult.no_of_questions_attempted = this.no_of_ques_attempted_by_user;
    userresult.score = userscore;
    userresult.user_answers = this.temp_user_answers;
    userresult.time_taken = "n hrs";
    this.temp_user_result_object = userresult;

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
        this.calculateScore();

      }
    }
  }
}
