import { Component, OnInit } from '@angular/core';
import { QuestionserviceService } from '../service/questionservice.service';
import {contest} from '../models/contest';
import {ContestService} from '../service/contest.service';
import {Router} from '@angular/router';
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
 //contest_id : getdata2() using contestserviceclass
 contest_id="5cdb97bf801df9421007f4a9";
  ngOnInit() {
      this.quesserv.getOnlyContestDetails(this.contest_id)
      .subscribe(contest=>{
        this.fetched_contest = contest;
        this.Name = contest.Name;
        this.starts=contest.Start_time;
        this.ends = contest.End_time;
        this.company=contest.Organized_by;
        this.time = contest.duration;
        console.log(this.fetched_contest);
      })


  }

  startTest(){

    if(this.guidelines_read == true){
      this.contserv.setdata(this.contest_id);
      this.router.navigate(['/playquiz2']);
    }
    else{
      alert('please read guidelines and tick the box to start the test')
    }

  }

  check(){
this.guidelines_read = true;
  }

}
