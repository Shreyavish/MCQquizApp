import { Component, OnInit,ViewChild } from "@angular/core";
import { questionpaper } from "../models/questionpaper";
import { question } from "../models/question";
import { contest } from "../models/contest";
import { QuestionserviceService } from "../service/questionservice.service";
import { ContestService } from "../service/contest.service";
import { leaderBoard } from "../models/leaderboard";
import { Router } from "@angular/router";
import { stringify } from "@angular/core/src/util";
import { timer } from 'rxjs';
import { CountdownComponent } from 'ngx-countdown';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
@Component({
  selector: "app-play-quiz-type-two",
  templateUrl: "./play-quiz-type-two.component.html",
  styleUrls: ["./play-quiz-type-two.component.css"]
})
export class PlayQuizTypeTwoComponent implements OnInit {
  constructor(
    private quesserv: QuestionserviceService,
    private contserv: ContestService,
    private router: Router,

  ) {


  }

  @ViewChild(CountdownComponent) counter: CountdownComponent;

  config;
  username: String = "";
  questions_of_each_section = [[]];
  our_contest_qpaper_sections = [];
  our_contest_quespaper;
  our_contest_leaderboarditems;
  our_contest = [];
  no_of_sections;
  temp = [[]];
  no_of_ques;
  no_of_ques_of_crnt_section = 0;
  start_qno_of_a_section: [number] = [0];
  end_qno_of_a_section: [number] = [0];
  length_of_section: [number] = [0];
  section_no_with_id: [{ sno: number; sid: string }] = [{ sno: 0, sid: "" }];

  //
  contest_id: string;
  crnt_ques_no = 0;
  crnt_ques = [];
  crnt_ques_id = "";
  crnt_ques_type = "";
  title = "";
  crnt_ques_options = [];
  crnt_section = "";
  crnt_section_no;
  question_no_with_id = [];
  array_userans: [number] = [0];
  flag = false; // check if question paper was succesfully loaded from db.If no error make flag true in "get" call of ngoninit
  mcqscore =0;




  is_saved =[];

  is_question_attempted: [{ qno: number; flag: boolean }] = [
    { qno: 0, flag: false }
  ];
  total_no_ques_contest = 0;
  no_of_ques_attempted_by_user = 0;

  is_quesno_attempted=[0];
  posting_res_first_time_flag = true;
  temp_user_result_object;
  temp_user_result_id;

  sum_of_scores = 0;

  initial_ans_fib: [string] = [""];
  make_final_submission = false;


  saved_user_answers : [{qid:string,ans:[any]}] = [{qid:"", ans:[""]}];
  user_answers : [{qid:string,ans:[any]}] = [{qid:"", ans:[""]}];
  act_answers:[{qid:string,ans:[any]}] = [{qid:"", ans:[""]}];

  //duration of contest which we get in form of 'HH:MM:SS'

  contest_duration;
  contest_duration_in_seconds ;

  // for observable timer
  seconds_calculator;
  val;
  ngOnInit() {


    // seconds timer : emits second as "val" variable.So, at any moment of time, we can check the total no of seconds which helps in calculating the time taken by user in completing the test
    const source = timer(1000, 1000);
     this.seconds_calculator = source.subscribe(val => {
      {this.val = val;
       // console.log(this.val, '-')
      };

    });


    //remove dummy
    this.user_answers.pop();
    this.act_answers.pop();
    this.array_userans.pop();
    this.section_no_with_id.pop();
    this.saved_user_answers.pop();
    this.sum_of_scores = 0;
    var qno = 0;
    this.contest_id = this.contserv.getdata();
    this.temp_user_result_id =this.contserv.getuserresultid();
    console.log(this.temp_user_result_id);

    this.quesserv.getContestById(this.contest_id).subscribe(cont => {
      console.log(cont);
      this.our_contest = cont;
      this.contest_duration = cont.duration;
      this.our_contest_quespaper = cont.questionpaper;
      // store the leaderboard item ids in an array
      console.log(this.our_contest_quespaper);
      this.our_contest_qpaper_sections = cont.questionpaper.sections;
      console.log(this.our_contest_qpaper_sections);
      this.no_of_sections = Object.keys(
        this.our_contest_quespaper.sections
      ).length;
      console.log(this.no_of_sections);
      console.log(this.our_contest);

      for (var i = 0; i < this.no_of_sections; i++) {
        var section_temp = {
          sno: i,
          sid: this.our_contest_qpaper_sections[i]._id

        };
        this.section_no_with_id.push(section_temp);

        this.no_of_ques = Object.keys(
          this.our_contest_qpaper_sections[i].questions
        ).length;
        this.length_of_section[i] = this.no_of_ques;
        console.log(this.no_of_ques);

        for (var j = 0; j < this.no_of_ques; j++) {
          this.question_no_with_id[qno] = this.our_contest_qpaper_sections[
            i
          ].questions[j]._id;
          // textbox and radio
          this.is_saved[qno] = false;

          if (
            this.our_contest_qpaper_sections[i].questions[j].type ==
            "text"
          ) {
            console.log(this.our_contest_qpaper_sections[i]);

            var actans3 = {
              qid: this.our_contest_qpaper_sections[i].questions[j]._id,
              ans: this.our_contest_qpaper_sections[i].questions[j]
                .text_answer
            };


            this.act_answers[qno] = actans3;



            console.log("crntquesno" + qno);
            this.initial_ans_fib.pop();
            var no_of_blanks = actans3.ans.length;
            for (var k = 0;k < no_of_blanks; k++) {
              this.initial_ans_fib.push(" ");
            }

            var tempblankans = {
              qid: this.our_contest_qpaper_sections[i].questions[j]._id,
              ans: this.initial_ans_fib
            };
            this.user_answers.push(tempblankans);

            console.log(this.initial_ans_fib);


          } else {
            var actans = {
              qid: this.our_contest_qpaper_sections[i].questions[j]._id,
              ans: this.our_contest_qpaper_sections[i].questions[j]
                .answer
            };

            this.act_answers[qno] = actans;



            console.log("done cb");



          }

          qno = qno + 1;
        }
      }
      console.log(this.section_no_with_id);
      this.total_no_ques_contest = qno;

      // initially no question is attempted
      for (var i = 0; i < this.total_no_ques_contest; i++) {
        this.is_quesno_attempted[i] = 0;
      }

      console.log(this.total_no_ques_contest);

      console.log(this.question_no_with_id);

      for(i=0;i<this.act_answers.length;i++){
      console.log("act answers are "  + this.act_answers[i].ans);
      }

      //at start of the test display first question of first section
      this.crnt_section = this.our_contest_qpaper_sections[0]._id;
      this.crnt_ques = this.our_contest_qpaper_sections[0].questions[0];
      this.crnt_ques_id = this.our_contest_qpaper_sections[0].questions[0]._id;
      this.crnt_ques_options = this.our_contest_qpaper_sections[0].questions[0].options;
      this.no_of_ques_of_crnt_section = this.our_contest_qpaper_sections[0].questions.length;
      this.crnt_section_no = 0;
      this.flag = true;
      this.calculate_start_indices_of_each_section();
      this.durationOfContestInSeconds();
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

    for(var i=0;i<this.section_no_with_id.length;i++){
      if(this.section_no_with_id[i].sid == sid){
        this.crnt_section_no = this.section_no_with_id[i].sno;
        break;
      }
    }

    for (var i = 0; i < this.no_of_sections; i++) {
      if (sid == this.our_contest_qpaper_sections[i]._id) {
        console.log("found sid");
        this.no_of_ques_of_crnt_section = this.our_contest_qpaper_sections[
          i
        ].questions.length;
        this.crnt_section = sid;

        for (var j = 0; j < this.no_of_ques_of_crnt_section; j++) {
          if (
            this.our_contest_qpaper_sections[i].questions[j]._id == qid
          ) {
            console.log("found qid");
            this.crnt_ques = this.our_contest_qpaper_sections[
              i
            ].questions[j];
            this.crnt_ques_id = this.our_contest_qpaper_sections[
              i
            ].questions[j]._id;
            this.crnt_ques_options = this.our_contest_qpaper_sections[
              i
            ].questions[j].options;
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
      this.our_contest_qpaper_sections[i].questions
    ).length;
  }

  saveTempAnswers(userans, qid, type, ischecked) {
    console.log(type);

    var check_flag = false; // flag to check if that question is getting answered first time or are changes being made
    for (var i = 0; i < this.user_answers.length; i++) {
      check_flag = false;
      if (this.user_answers[i].qid == qid) {
        check_flag = true;

        if (type == 'radio') {
          // this.temp_user_answers[i].ans = [0];
          this.user_answers[i].ans.pop();
          this.user_answers[i].ans.push(userans);
          //this.is_quesno_attempted[this.crnt_ques_no] = 1;
         // console.log(this.crnt_ques_no + ' '+this.is_question_attempted[this.crnt_ques_no]);
          console.log('attempted');
          console.log(this.user_answers[i]);
        } else if (type == 'checkbox' ) {
          if (ischecked == true) {
            this.user_answers[i].ans.push(userans);
            this.is_quesno_attempted[this.crnt_ques_no] = 1;
            console.log('attempted');
          } else {
            for (var j = 0; j < this.user_answers[i].ans.length; j++) {
              if (userans == this.user_answers[i].ans[j]) {
                this.user_answers[j].ans.splice(j, 1);
              }
            }
          }
        } else {
          // do nothing because for fill in the blank type there is another function save_temp_fib
        }
        break;
      }
    }
    // question is being answered first time . create an object and push into temp_user_answer
    if (check_flag == false) {
      var temp: { qid: string; ans: [number] } = { qid: "", ans: [0] };
      temp.ans.pop();

      temp.qid = qid;
      temp.ans.push(userans);
      this.is_quesno_attempted[this.crnt_ques_no] = 1;
      this.user_answers.push(temp);
      //this.no_of_ques_attempted_by_user = this.no_of_ques_attempted_by_user + 1;
    }

    console.log(this.user_answers);
  }

  save_temp_fib_ans(qid, userans, i) {


    for (var k = 0; k < this.user_answers.length; k++) {


      if (this.user_answers[k].qid == qid) {
        this.user_answers[k].ans[i] = userans;
        this.is_quesno_attempted[this.crnt_ques_no] = 1;
        console.log('attempted');
        //this.no_of_ques_attempted_by_user = this.no_of_ques_attempted_by_user + 1;
        break;
      }
    }
   /* this.user
    if (check_flag2 == false) {
      var temp: { qid: string; ans: [string] } = { qid: "", ans: [""] };
      temp.ans.pop();
      temp.qid = qid;
      temp.ans[i] = userans;
      this.user_answers.push(temp);
    }*/
    console.log(this.user_answers);

    // calculating the score here itself
  }

  save_temp_ans_to_db(saveqid) {
    console.log(this.user_answers.length);

    for(var i=0;i<this.user_answers.length;i++){
      var flag =0;
      if(this.user_answers[i].qid == saveqid){

        // check if it was already saved or being saved for the first time
        for(var j=0;j<this.saved_user_answers.length;j++){
          if(this.saved_user_answers[j].qid == saveqid){
            this.saved_user_answers[j] = this.user_answers[i];
            flag=1;
            break;
          }
        }
        if(flag == 0){
        this.saved_user_answers.push(this.user_answers[i]);
        }
        break;
      }
    }

    //console.log(this.user_answers.length);
    /*if (this.posting_res_first_time_flag == true) {
      this.mcqscore =0;
      this.calculateScore();// for mcqs
      //this.calculateScoreforFIB();
      this.update_user_result();
      this.quesserv
        .postResultFirstTime(this.temp_user_result_object)
        .subscribe(res => {
          this.temp_user_result_id = res._id;
          console.log(res);
          console.log(this.crnt_ques_no);
          this.posting_res_first_time_flag = false;
          this.array_userans = [0];
          this.array_userans.pop(); // make array empty so that next question's answers would not get pushed rather they should be int0 new array
        });
    } else {*/
      this.mcqscore =0;


        this.calculateScore();// for mcqs
        //this.calculateScoreforFIB();

      this.update_user_result();
      console.log(this.temp_user_result_id);
      this.quesserv
        .postTempResult(this.temp_user_result_object, this.temp_user_result_id)
        .subscribe(res => {
          console.log(res);
          //this.is_quesno_attempted[this.crnt_ques_no] = 1;

          // updating is saved variable to change color
          for(var i=0;i<this.question_no_with_id.length;i++){

            for(var j=0;j<this.saved_user_answers.length;j++){
              if(this.question_no_with_id[i] == this.saved_user_answers[j].qid){
                this.is_saved[i] = true;
                break;
              }
            }
            // for now we are storing only those questions count which have been saved
            this.no_of_ques_attempted_by_user = this.saved_user_answers.length;
            console.log("no of attempted"+this.no_of_ques_attempted_by_user);

          }

          console.log(this.crnt_section_no);
          console.log(this.crnt_ques_no);

          this.getNextQuestion(saveqid);
        });

      this.array_userans = [0];
      this.array_userans.pop(); // make array empty so that next question's answers would not get pushed rather they should be int0 new array
    //}

  }

  getNextQuestion(qid) {
    console.log("get next of "+qid);
    var next_section_no=0;
    var next_section_id="";
    var flag = 0;
    if (this.crnt_ques_no + 1 < this.total_no_ques_contest) {
      for (var i = 0; i < this.question_no_with_id.length; i++) {
        if (qid == this.question_no_with_id[i]) {
          break;
        }
      }

      // if the section ends fetch the next section. For that we need to get the section id of next section
      i = i + 1;
      console.log(i);

      for (var j = this.crnt_section_no; j < this.no_of_sections; j++) {
        if (i > this.end_qno_of_a_section[j]) {
          // this means that we have reached the end of the crnt section
          console.log("section ended here");
       // next question
          next_section_no = j + 1;
          console.log(next_section_no);
          //get the next section id using next section no
          for (var m = 0; m < this.section_no_with_id.length; m++) {
            if (next_section_no == this.section_no_with_id[m].sno) {
              next_section_id = this.section_no_with_id[m].sid;
              this.crnt_section = next_section_id;
              this.crnt_section_no = next_section_no;
              console.log(this.crnt_section_no);
              console.log(this.crnt_section);
              console.log(i);
              flag = 1;
              break;
            }
          }
          if (flag == 1) {
            break;
          }
        }
      }

      // increment the question no because next question has +1 qno

      console.log(" calcul   section is "+this.crnt_section);
      console.log("next calculated is"+this.question_no_with_id[i]);
      this.fetchQuestion(this.question_no_with_id[i], this.crnt_section, i);
    }
  }

  getPreviousQuestion(qid) {
    var previous_section_no=0;

    var previous_section_id="";

    var  flag = 0;
    if (this.crnt_ques_no > 0) {
      for (var i = 0; i < this.question_no_with_id.length; i++) {
        if (qid == this.question_no_with_id[i]) {
          break;
        }
      } // decrement the question no because previous question has -1 qno

      i=i-1;

      // if section starts at this point, then we need to get the previous section to fetch the previous question

     for(var j= this.crnt_section_no ; j > 0;j--){

      if(i < this.start_qno_of_a_section[j]){
        console.log("at start point of section");
        previous_section_no = j-1;
        console.log(previous_section_no);


        // get the previous section using section no
        for(var m=0;m<this.section_no_with_id.length;m++){

          if(previous_section_no == this.section_no_with_id[m].sno){
            previous_section_id = this.section_no_with_id[m].sid;
            this.crnt_section = previous_section_id;
            this.crnt_section_no = previous_section_no;

            console.log(this.crnt_section_no);
            console.log(this.crnt_section);
            console.log(i);
            flag = 1;
            break;
          }
        }
        if (flag == 1) {
          break;
        }
      }
    }

      this.fetchQuestion(
        this.question_no_with_id[i],
        this.crnt_section,
        i
      );
    }
  }

  calculateScore() {
    //var mcq_score = 0;
    var compareAnswers = false;

    for (var i = 0; i < this.saved_user_answers.length; i++) {
      for (var j = 0; j < this.act_answers.length; j++) {
        if ( this.saved_user_answers[i].qid == this.act_answers[j].qid){
          console.log("entered id");



          compareAnswers = this.compare(
            this.saved_user_answers[i].ans,
            this.act_answers[j].ans
          );


          if (compareAnswers == true) {
            // console.log("enteres ans");
            this.mcqscore = this.mcqscore + 1;
            console.log("the mcq score is " + this.mcqscore);
          }
         // question already found so stop looping
        }

      }
    }
    //alert("your score is " + score);
    //this.sum_score(mcq_score);
  }

  //compare arrays of user answers
  compare(arr1, arr2) {
    arr1.sort();
    arr2.sort();

    console.log(arr1);
    console.log(arr2);

    if (arr1.length != arr2.length) {
      console.log('false');
      return false;
    }
    for (var i = 0; i < arr1.length; i++) {
      // for (var j = 0; j < arr1.length; j++) {
      if (arr1[i] != arr2[i]) {
        console.log(i+'false');
        return false;
      }
      //}
    }
    return true;
  }



  update_user_result() {

    // unsubscribe the seconds calulator to get the crnt no of seconds taken by user to attempt the test



    var time_taken =new String(this.timeTakenByUser(this.val));
    console.log(time_taken);




    //calculate_no_ques_attempted()
    //{
      var no =0;
      console.log("entered no of ques");
      for(var i=0;i<this.total_no_ques_contest;i++){
        if(this.is_quesno_attempted[i] == 1){
          no= no+1;
          console.log('no = '+no);
        }
      }

      //return no;
    //}


    // if final submission is not to be made yet just create a user result object and store in temp_user_resullt object so that temp answers will get stored in just leaderboarditems not contest schema.This updating is done through save_temp_db function
    var userresult = new leaderBoard();
    userresult.username = this.contserv.getusername();
    //userresult.no_of_questions_attempted = no;
    // attempted are those which are both attempted and saved
    userresult.no_of_questions_attempted = this.saved_user_answers.length;
    userresult.score = this.mcqscore;
    //  userresult.user_answers = this.temp_user_answers;
    userresult.time_taken = time_taken;
    userresult.contest_id = this.contest_id;
    this.temp_user_result_object = userresult;

    // if finally submission is made then update into actual db
    console.log(this.temp_user_result_object.no_of_questions_attempted);
    if (this.make_final_submission == true) {



      this.quesserv
      .postTempResult(this.temp_user_result_object, this.temp_user_result_id)
      .subscribe(res => {
        console.log(res);
        this.seconds_calculator.unsubscribe();
        this.router.navigate(["/userlanding"]);
      });

      /*this.quesserv
        .postResult(userresult, this.contest_id)
        .subscribe(response => {
          console.log(response);
          this.router.navigate(["/userlanding"]);
        });*/

    }
  }

  promptMessageToUser() {
    console.log(this.no_of_ques_attempted_by_user);
    if (this.no_of_ques_attempted_by_user >= this.total_no_ques_contest) {
      this.make_final_submission = true;
      this.calculateScore();
      this.update_user_result();
    } else {
      if (this.no_of_ques_attempted_by_user < this.total_no_ques_contest) {
        var input = prompt(
          "You some questions left unanswered or unsaved.Do you still wish to end the test? (Y/N)"
        );
      }

      if (input == "Y" || input == "y") {
        this.make_final_submission = true;
        this.update_user_result();
      }
    }
  }

  calculate_start_indices_of_each_section() {
    this.start_qno_of_a_section[0] = 0;
    this.end_qno_of_a_section[0] = 0 + this.length_of_section[0] - 1;
    console.log("start" + this.start_qno_of_a_section[0]);
    console.log("end" + this.end_qno_of_a_section[0]);
    console.log(this.length_of_section[0]);
    for (var i = 1; i < this.our_contest_qpaper_sections.length; i++) {
      console.log("length of sec "+i+" is"+this.length_of_section[i]);
      this.start_qno_of_a_section[i] =
        this.start_qno_of_a_section[i - 1] + this.length_of_section[i - 1];
      this.end_qno_of_a_section[i] =
        this.start_qno_of_a_section[i] + this.length_of_section[i] - 1;
        console.log("start" + this.start_qno_of_a_section[i]);
    console.log("end" + this.end_qno_of_a_section[i]);
    }


  }



  customTrackBy(index: number, obj: any): any {
    return index;
  }

  onFinished()
      {
        alert("oops the time ended");

        this.make_final_submission = true;
        this.update_user_result();
      }



      // observable timer triggers every one second.The no ofseconds is stored in val.
      // supply val value into time stamp hh:mm:ss using the below function
    timeTakenByUser(totalSeconds){
      var hours   = Math.floor(totalSeconds / 3600);
      var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
      var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

      // round seconds
      seconds = Math.round(seconds * 100) / 100

      var result = (hours < 10 ? "0" + hours : hours);
          result += "-" + (minutes < 10 ? "0" + minutes : minutes);
          result += "-" + (seconds  < 10 ? "0" + seconds : seconds);
      return result;
    }

    durationOfContestInSeconds(){
          var hms = this.contest_duration;   // your input string
          var a = hms.split(':'); // split it at the colons

          // minutes are worth 60 seconds. Hours are worth 60 minutes.
          var contest_duration_in_seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

          console.log(contest_duration_in_seconds);

          this.config = {
            leftTime: contest_duration_in_seconds,
            size: 'large',
            demand: false
          };

    }
    started(){
      console.log('started');
    }

    calculate_no_ques_attempted()
    {
      var no =0;
      console.log("entered no of ques");
      for(var i=0;i<this.total_no_ques_contest;i++){
        if(this.is_quesno_attempted[i] == 1){
          no= no+1;
          console.log('no = '+no);
        }
      }
      return no;
    }


}
