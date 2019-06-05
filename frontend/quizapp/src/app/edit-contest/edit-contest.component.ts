import { Component, OnInit } from '@angular/core';
import {QuestionserviceService} from '../service/questionservice.service';
import {contest} from '../models/contest';
import {question} from '../models/question';
import { Time } from '@angular/common';
import {ContestService} from '../service/contest.service';
import { Console } from '@angular/core/src/console';
import {Router } from '@angular/router';
import * as moment from 'moment';
import { StringifyOptions } from 'querystring';
@Component({
  selector: 'app-edit-contest',
  templateUrl: './edit-contest.component.html',
  styleUrls: ['./edit-contest.component.css']
})
export class EditContestComponent implements OnInit {

  constructor(private quesserv: QuestionserviceService,private contserv:ContestService,private router:Router) { }

  toEditContest;
  editedContest;

  //id:String = '5ccc14803e016d813437bcd2';

  // contest parameters:
  Name: String;
  Start_time;
  End_time;
  Organized_by:String;
  Contest_Link:String;
  Questions:[question];
  s_time: Time;
  e_time: Time;
  contest_id:String;

  dur_hrs : String;
  dur_min : String;
  duration:String;
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

    /*this.quesserv.getContest().subscribe(fetchedContests =>
      {this.fetchedContests = fetchedContests,
        console.log(this.fetchedContests);
      })*/
      if(this.contserv.geteditcontest() == true){
      this.getContestDetails();
      }
  }

  getContestDetails(){


    this.contest_id = this.contserv.getdata2();

    console.log(moment(new Date()).format("YYYY-MM-DD hh:mm A"));
    this.quesserv.getContestToEdit(this.contest_id).subscribe( toEditContest =>
      {this.toEditContest = toEditContest;
        this.Name = this.toEditContest.name;
        this.Start_time = new Date(this.toEditContest.start_time),
        this.End_time = new Date(this.toEditContest.end_time),
        this.Organized_by = this.toEditContest.organized_by,
        this.Contest_Link = this.toEditContest.contest_link,

        this.duration = this.toEditContest.duration,

        this.dur_hrs = this.duration.substr(0,2);
        this.dur_min = this.duration.substr(3,2);
        console.log(this.dur_hrs);
        console.log(this.dur_min);

       this.Start_time= moment(this.Start_time).format("YYYY-MM-DD hh:mm A");
       this.End_time =moment(this.End_time).format("YYYY-MM-DD hh:mm A");
        /*var sd = this.Start_time.getDate();
        if(sd<10){
          sd='0'+sd;
        }
        var sm = this.Start_time.getMonth();
        if(sm<10){
          sm='0'+sm;
        }
        var sy = this.Start_time.getFullYear();

        var sh = this.Start_time.getHours();
        var sm= this.Start_time.getMinutes();
        var ss= this.Start_time.getSeconds();


        //console.log(this.Start_time.toISOString());
        //console.log(this.Start_time.toDateString());
        /*console.log(this.Start_time.getDate());
        console.log(this.Start_time.getMonth());
        console.log(this.Start_time.getFullYear());
        console.log(this.Start_time.getHours());
        console.log(this.Start_time.getMinutes());
        console.log(this.Start_time.getSeconds());*/


        //this.st_temp = sy+'-'+sm+'-'+sd;

        // splitting date and time
        this.st_temp =this.Start_time.toString();
        this.st_temp =this.st_temp.substr(0,10);

        //this.st2 = sh+':'+sm+':'+ss;
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
      name: this.Name,
      start_time: this.Start_time,
      end_time: this.End_time,
      organized_by: this.Organized_by,
      contest_link:this.Contest_Link,
     duration:this.dur_hrs+':'+this.dur_min+':'+"00"
    }

    console.log(this.editedContest);
    this.quesserv.editContest(this.contest_id,this.editedContest).subscribe(editedContest=>
      {this.editedContest = editedContest;
        console.log(this.editedContest);
      this.router.navigate(['/getcontests']);
    })
  }


  /*removeQuesFromArray(ques:question){
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
  }*/
  editQuestionsNow(){
    this.contserv.seteditcontest(true);
    this.router.navigate(['/showquestionpapers']);

  }
  deleteContest(){
    console.log(this.contest_id);
    var r = confirm("Are you sure you want to delete this contest?")
    if(r==true){

      this.quesserv.deleteContest(this.contest_id).subscribe(res=>{
        if(res._id ==this.contest_id){
          alert("Contest deleted successfully");
          this.contserv.seteditcontest(false);
          this.router.navigate(['/getcontests']);
        }
      })
    }else{
      //alert("no");
    }

  }

}
