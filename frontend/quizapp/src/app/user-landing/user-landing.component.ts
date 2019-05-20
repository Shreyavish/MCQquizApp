import { Component, OnInit } from '@angular/core';
import { QuestionserviceService } from '../service/questionservice.service';
import {contest} from '../models/contest';
import {ContestService} from '../service/contest.service';
import {Router} from '@angular/router';
import {leaderBoard} from '../models/leaderboard';
@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.css']
})
export class UserLandingComponent implements OnInit {

  constructor(private quesserv:QuestionserviceService,private contserv:ContestService,private router:Router) { }

  fetched_contest:contest;
  Name:string;
  starts: string;
  ends : string;
  company: string;
  time: string;
  guidelines_read: boolean=false;
  username: string;
  contest_leaderboard;
  show_lb_flag = false;
  already_attempted =false;
  printmsg = "";
 //contest_id : getdata2() using contestserviceclass
 //contest_id="5cdd3c3e848eda148cb709e8";
 //contest_id = "5cda5df743b7995dc01c18cc";
 contest_id = "5ce244bc2772a345e86b440c";
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
      })

  }

  startTest(uname){
    this.username = uname;
     this.checkIfAlreadyAttempted();
     console.log(this.already_attempted);

    if(this.already_attempted == true){
        this.printmsg = "You have already attempted the test";
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

}
