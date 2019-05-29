import { Component, OnInit } from '@angular/core';
import {QuestionserviceService} from '../service/questionservice.service';
import {contest} from '../models/contest';
import {leaderBoard} from '../models/leaderboard';
import {question} from '../models/question';
import {Time} from '@angular/common';
import {ContestService} from '../service/contest.service';
import {Router} from '@angular/router';
import { BsCustomDatesViewComponent } from 'ngx-bootstrap/datepicker/themes/bs/bs-custom-dates-view.component';
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
  Leaderboard= ["",0,""];
  Name: String;
  Start_time: Date;
  End_time: Date;
  s_time: Time;
  e_time: Time;
  Organized_by:String;
  Contest_Link:String;
  editlater_flag= false;
    duration:String = "01:30:00";
  ngOnInit() {
  }

   createContest(){

    var temp1 = this.Start_time+' '+this.s_time;
    var temp2 = this.End_time+' '+this.e_time;



  if(temp1 > temp2){
      alert('Start time cannot be greater than end time');
    } else{

    let newcontest={
      Name: this.Name,
      Start_time:new Date(this.Start_time+' '+this.s_time),
      End_time:new Date(this.End_time+' '+this.e_time),
      Organized_by:this.Organized_by,
      Contest_Link:this.Contest_Link,
      Questions: this.Questions,
     Leaderboard:this.Leaderboard,
    duration:this.duration
    }

    this.quesserv.createContest(newcontest).subscribe(
      newcontest=>
      {this.newcontest=newcontest;
        console.log(this.newcontest);
        alert('Contest Created Successfully');
        this.contserv.setdata2(this.newcontest._id);
        if(this.editlater_flag == false){
       this.router.navigate(['/showquestionpapers']);
        }else{
          this.router.navigate(['/homepage']);
        }


      }
    )
    }
   }

   editquestionslater(){
     this.editlater_flag = true;
     this.createContest();
   }

}
