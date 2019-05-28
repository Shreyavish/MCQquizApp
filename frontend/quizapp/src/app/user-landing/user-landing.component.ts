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
  starts: string;
  ends : string;
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
 //contest_id : getdata2() using contestserviceclass
 //contest_id="5cdd3c3e848eda148cb709e8";
 //contest_id = "5cda5df743b7995dc01c18cc";
 //contest_id = "5ce244bc2772a345e86b440c";
 //default
 contest_id = "5ce4f05d1e8f36306c408c57";
//contest_id= "5ce7b3b4b3f09904f2c26163";
//contest_id ="5ce7cb77b3f09904f2c26164";
  ngOnInit() {

      this.quesserv.getOnlyContestDetails(this.contest_id)
      .subscribe(contest=>{
        this.fetched_contest = contest;
        this.Name = contest.Name;
        this.starts=contest.Start_time;
        this.ends = contest.End_time;
        this.company=contest.Organized_by;
        this.time = contest.duration;
        this.contest_leaderboard = contest.LeaderBoard;
        console.log(this.fetched_contest);

        var timer = setInterval( ()=>{
        this.timeBetweenDates();
        }, 1000);


  }
      )}


  startTest(uname){
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
                this.router.navigate(['/playquiz2']);
              }
              else{
                alert('please read guidelines and tick the box to start the test')
              }

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
    var difference = new Date(this.starts).getTime() - now.getTime();

  if(difference > 0) {

      this.sec = Math.floor(difference / 1000);
    this.min = Math.floor(this.sec / 60);
    this.hrs = Math.floor(this.min / 60);
     this.days = Math.floor(this.hrs / 24);

      this.hrs %= 24;
      this.min %= 60;
      this.sec %= 60;
      this.is_contest_active =false;
      this.msg="Starts in : ";

  }
  else

      // check if the contest is going on or already completed

      var diff = new Date(this.ends).getTime() - now.getTime();

      if(diff > 0){
        this.is_contest_active = true;
       this.msg = " The contest is active"
      }
      else if(diff <= 0){
        this.is_contest_active = false;
        this.msg = "Uh oh! The contest has already ended";
      }



  }



    }
