import { Component, OnInit } from '@angular/core';
import {QuestionserviceService} from '../service/questionservice.service';
import {contest} from '../models/contest';
import {question} from '../models/question';
import { Time } from '@angular/common';
import {ContestService} from '../service/contest.service';
import { Console } from '@angular/core/src/console';
import {Router } from '@angular/router';
@Component({
  selector: 'app-edit-contest',
  templateUrl: './edit-contest.component.html',
  styleUrls: ['./edit-contest.component.css']
})
export class EditContestComponent implements OnInit {

  constructor(private quesserv: QuestionserviceService,private contserv:ContestService,private router:Router) { }
  toEditContest : contest;
  editedContest: contest;
  fetchedContests: [contest];
  //id:String = '5ccc14803e016d813437bcd2';

  // contest parameters:
  Name: String;
  Start_time: Date;
  End_time: Date;
  Organized_by:String;
  Contest_Link:String;
  Questions:[question];
  s_time: Time;
  e_time: Time;
  contest_id:String;
  contest_time: String;
  _id:String;
  collapse_flag:Boolean=false;
  default_display: Boolean =false;
  q: question;
  // temp paramters for splitting and displaying date and time
    st_temp : string; //start time temp  (start date)
    et_temp: string; //end time temp (end date)

    st2 : string; //start IST time
    et2: string ; // end IST time
  flag=0;
  ngOnInit() {

    this.quesserv.getContest().subscribe(fetchedContests =>
      {this.fetchedContests = fetchedContests,
        console.log(this.fetchedContests);
      })
  }

  getContestDetails(){


    this.contserv.setdata2(this.contest_id);
    this.quesserv.getContestToEdit(this.contest_id).subscribe( toEditContest =>
      {this.toEditContest = toEditContest;
        this.Name = this.toEditContest.Name;
        this.Start_time = this.toEditContest.Start_time,
        this.End_time = this.toEditContest.End_time,
        this.Organized_by = this.toEditContest.Organized_by,
        this.Contest_Link = this.toEditContest.Contest_Link,
        this.Questions = this.toEditContest.Questions,
        this.contest_time = this.toEditContest.active_time
        console.log(this.toEditContest);

        // splitting date and time
        this.st_temp =this.Start_time.toString();
        this.st_temp =this.st_temp.substr(0,10);

        this.st2 =this.Start_time.toString();
        this.st2=this.st2.substr(11,5);
        console.log(this.st_temp);
        console.log(this.st2);

        this.et_temp =this.End_time.toString();
        this.et_temp =this.et_temp.substr(0,10);



        this.et2 =this.End_time.toString();
        this.et2=this.et2.substr(11,5);
        console.log(this.et_temp);
        console.log(this.et2);
        this.flag=1;
      })
  }


  editContest(){

    this.Start_time = new Date(this.st_temp+' '+this.st2);
     this.End_time = new Date(this.et_temp+' '+this.et2);

    this.editedContest = {
      Name: this.Name,
      Start_time: this.Start_time,
      End_time: this.End_time,
      Organized_by: this.Organized_by,
      Contest_Link:this.Contest_Link,
      active_time:this.contest_time
    }

    this.quesserv.editContest(this.contest_id,this.editedContest).subscribe(editedContest=>
      {this.editedContest = editedContest;
        console.log(this.editedContest);
      this.router.navigate(['/getexistquestions']);
    })
  }


  removeQuesFromArray(ques:question){
    for(var i=0;i<this.Questions.length;i++){
      if(this.Questions[i] == ques ){
        break;
      }
    }
    this.Questions.splice(i,1);
    console.log(this.Questions);
  }

  supplyId(contest_id){
    this.contest_id =contest_id;
    this.getContestDetails();
  }
  collapse(q) {
		q.collapse_flag = !q.collapse_flag;
		this.q.collapse_flag = q.collapse_flag;
    console.log(this.collapse_flag);
  }

  deleteContest(id){


    var decision = prompt('Are you sure you want to delete this contest? Y/N');

    decision.toLowerCase();

    if(decision == 'y'){
      for(var i=0;i<this.fetchedContests.length;i++){
        if(this.fetchedContests[i]._id == id){
          this.fetchedContests.splice(i,1);
          break;
        }
      }
    this.quesserv.deleteContest(id).subscribe(item=>{
      {console.log('deleted contest successfully');

      }
    });
    }
  }
}
