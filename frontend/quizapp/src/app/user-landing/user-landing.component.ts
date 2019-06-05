import { Component, OnInit,ViewChild } from '@angular/core';
import { QuestionserviceService } from '../service/questionservice.service';
import {contest} from '../models/contest';
import {ContestService} from '../service/contest.service';
import {Router} from '@angular/router';
import {leaderBoard} from '../models/leaderboard';
import { timer } from 'rxjs';
import { CountdownComponent } from 'ngx-countdown';
@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.css']
})
export class UserLandingComponent implements OnInit {

  constructor(private quesserv:QuestionserviceService,private contserv:ContestService,private router:Router) { }
  @ViewChild(CountdownComponent) counter: CountdownComponent;
  config;
  fetched_contest:contest;
  Name:string;
  starts;
  ends ;
  company: string;
  time: string;
  msg : string;

  days; hrs; sec; min;
  guidelines_read: boolean=false;
  username: string;
  contest_leaderboard;
  show_lb_flag = false;
  already_attempted =false;
  printmsg = "";
  is_contest_active = false;
  is_time_calculated = false;
  contest_starts_in  ;
  is_contest_ended = false;
 //contest_id : getdata2() using contestserviceclass
 //contest_id="5cdd3c3e848eda148cb709e8";
 //contest_id = "5cda5df743b7995dc01c18cc";
 //contest_id = "5ce244bc2772a345e86b440c";
 //default contest active
// contest_id = "5ce4f05d1e8f36306c408c57";
//contest_id= "5ce7b3b4b3f09904f2c26163";
//contest_id ="5ce7cb77b3f09904f2c26164";

// contest ended
//contest_id = "5cef8e2e9c92e72e9064d1fa";

// contest not yet started
//contest_id = "5cef8e7c9c92e72e9064d1fb";

//strapi
//contest_id ="5cf62dc89f22d438a07d780c";

// heroku
contest_id = "5cf75a8c3cc0ef00173dabdc";
user_result_ids =[];
  ngOnInit() {

      this.quesserv.getContestDetails(this.contest_id)
      .subscribe(contest=>{
        this.fetched_contest = contest;
        this.Name = contest.name;
        this.starts=new Date(contest.start_time);
        this.ends = new Date(contest.end_time);
        this.company=contest.organized_by;
        this.time = contest.duration;
        this.contest_leaderboard = contest.leaderboarditems;
        for(var i=0;i<this.contest_leaderboard.length;i++){
          this.user_result_ids.push(this.contest_leaderboard[i]._id);
        }
        console.log(this.fetched_contest);

        var timer = setInterval( ()=>{
        this.timeBetweenDates();
        }, 1000);
        //this.timeBetweenDates();


  }
      )}


  startTest(uname){
    if(this.is_contest_active == true){
    this.username = uname;
     this.checkIfAlreadyAttempted();
     console.log(this.already_attempted);

    if(this.already_attempted == true){
        this.printmsg = "You have successfully attempted this test";
        this.already_attempted = false;
    }
    else{
      this.printmsg = "";

              if(this.guidelines_read == true){
                this.contserv.setdata(this.contest_id);
                this.contserv.setusername(this.username);
                //this.postStartingStatus();


                let tempresult = {

                  "username": this.username,
                  "no_of_questions_attempted": 0,
                  "score": 0,
                  "time_taken": "00:00:00",
                  "contest_id" : this.contest_id
                }
                this.quesserv.postResultFirstTime(tempresult).subscribe(res=>{
                  var id = res._id;
                  console.log(id);
                  this.contserv.setuserresultid(id);
                  this.user_result_ids.push(id);
                  console.log(this.contserv.getuserresultid());
                  let lbitems = {
                    leaderboarditems : this.user_result_ids
                  }
                  this.quesserv.postUserResultIdsToContest(lbitems,this.contest_id).subscribe(res=>{
                    console.log(res);
                  })



                  this.router.navigate(['/playquiz2']);
                })




              }
              else{
                alert('please read guidelines and tick the box to start the test')
              }

      }
    }else{


    }
  }
  check(){
this.guidelines_read = true;
  }

  showLeaderBoard(){
    this.show_lb_flag = true;
    console.log(this.contest_leaderboard);

    this.contest_leaderboard.sort((a, b) => a.score < b.score ? 1 : a.score > b.score ? -1 : 0);

    console.log("after sorting"+this.contest_leaderboard[0].username);



  }


  checkIfAlreadyAttempted(){
    for(var i=0;i<this.contest_leaderboard.length;i++){

      if(this.username.trim() == this.contest_leaderboard[i].username.trim()){
        this.already_attempted = true;

      }
    }
  }

  // time left for the contest to start.if its negative that means contest has already started .IN that case we need to check how much time id left
  /*calculateTimeLeft()
  {
    this.contest_starts_in =+(new Date(this.starts)) - +(Date.now());  // return time left in milli seconds
    //console.log(starts_in);
    if(this.contest_starts_in > 0){
      // convert miliseconds to seconds
      this.contest_starts_in = this.contest_starts_in / 1000;
      console.log(this.contest_starts_in)
          // this is for countdown component. setting the configurations
          this.config = {
            leftTime: this.contest_starts_in,s
            demand: false
          };
          this.is_time_calculated = true;
    }
  }
  setConfig(){
  }
  started(){
    console.log('started');
  }
  onFinished(){
    console.log('finished');
  }*/


   timeBetweenDates() {
    var now = new Date();
    var difference1 =  new Date(this.starts).getTime() -now.getTime() ;
    var  difference2 =  new Date(this.ends).getTime() -now.getTime() ;


    if(difference1 < 0 && difference2 > 0) // contest is active

    {

      // code for contest ends in


      this.sec = Math.floor(difference2 / 1000);
      this.min = Math.floor(this.sec / 60);
      this.hrs = Math.floor(this.min / 60);
       this.days = Math.floor(this.hrs / 24);

        this.hrs %= 24;
        this.min %= 60;
        this.sec %= 60;
      this.is_contest_active = true;
      this.msg = " The contest is active for ";

    }
    else{

      if(difference1 > 0){
        // code for contest starts in



        this.sec = Math.floor(difference1 / 1000);
        this.min = Math.floor(this.sec / 60);
        this.hrs = Math.floor(this.min / 60);
         this.days = Math.floor(this.hrs / 24);

          this.hrs %= 24;
          this.min %= 60;
          this.sec %= 60;
          this.is_contest_active =false;
          this.msg="The contest starts in : ";
      }
      else if (difference2 <0){
        // contest has ended already
        this.is_contest_active = false;
        this.is_contest_ended = true;// for msg printing in html it comes into handy
        this.msg = "Uh oh! The contest has already ended";
      }
      else{
        this.msg = "Something went wrong!";
      }

    }


  }

  // when start button is clicked store the initial status of the username with the contest id and other fields
    postStartingStatus(){

    }


    }
