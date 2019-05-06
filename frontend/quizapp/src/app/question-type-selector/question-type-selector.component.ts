import { Component, OnInit } from '@angular/core';
import {QuestionserviceService} from '../service/questionservice.service';
import {ContestService} from '../service/contest.service';
import {contest} from '../models/contest';
import {Router} from '@angular/router';
@Component({
  selector: 'app-question-type-selector',
  templateUrl: './question-type-selector.component.html',
  styleUrls: ['./question-type-selector.component.css']
})
export class QuestionTypeSelectorComponent implements OnInit {

  constructor(private quesserv:QuestionserviceService,private contserv:ContestService,private router:Router) { }

  id:String;
  addedcontest: contest;
  //contest paramters
  _id?:String
  Name: String;
  Start_time: Date;
  End_time: Date;
  Organized_by:String;
  Contest_Link:String;
  Marks:Number;
  Level:String;

  ngOnInit() {
    this.id =this.contserv.getdata2();
    this.quesserv.getContestById(this.id).subscribe(addedcontest =>
      {this.addedcontest= addedcontest;
        this.Name = this.addedcontest.Name;
        this.Start_time = this.addedcontest.Start_time;
        this.End_time=this.addedcontest.End_time;
        this.Organized_by=this.addedcontest.Organized_by;
        this.Contest_Link=this.addedcontest.Contest_Link;
        console.log(this.addedcontest);
      })
  }


  addNewQuestions(){
    this.router.navigate(['/addquestions']);

  }

  getExistingQuestions(){
      this.router.navigate(['/getexistquestions']);
  }



}
