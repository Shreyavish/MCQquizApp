import { Component, OnInit } from '@angular/core';
import {QuestionserviceService} from '../service/questionservice.service';
import {contest} from '../models/contest';
import {leaderBoard} from '../models/leaderboard';
import {question} from '../models/question';
import {Time} from '@angular/common';
import {ContestService} from '../service/contest.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-create-contest',
  templateUrl: './create-contest.component.html',
  styleUrls: ['./create-contest.component.css']
})
export class CreateContestComponent implements OnInit {

  constructor(private quesserv: QuestionserviceService,private contserv:ContestService,private router:Router) { }

  newcontest: contest;
  newquestion: question;
  Questions = [];
  Leaderboard= [];
  Name: String;
  Start_time: Date;
  End_time: Date;
  s_time: Time;
  e_time: Time;
  Organized_by:String;
  Contest_Link:String;


  ngOnInit() {
  }

   createContest(){

    let newcontest={
      Name: this.Name,
      Start_time:new Date(this.Start_time+' '+this.s_time),
      End_time:new Date(this.End_time+' '+this.e_time),
      Organized_by:this.Organized_by,
      Contest_Link:this.Contest_Link,
      Questions: this.Questions,
     Leaderboard:this.Leaderboard,
    }

    this.quesserv.createContest(newcontest).subscribe(
      newcontest=>
      {this.newcontest=newcontest;
        console.log(this.newcontest);
        alert('Contest Created Successfully');
        this.contserv.setdata2(this.newcontest._id);
        this.router.navigate(['/qtypeselector']);


      }
    )

   }

}
