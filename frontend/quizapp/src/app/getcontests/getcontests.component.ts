import {contest} from '../models/contest';
import {QuestionserviceService } from '../service/questionservice.service';
import {ContestService} from '../service/contest.service';
import { Component, OnInit } from '@angular/core';

import {Router } from '@angular/router';

@Component({
  selector: 'app-getcontests',
  templateUrl: './getcontests.component.html',
  styleUrls: ['./getcontests.component.css']
})
export class GetcontestsComponent implements OnInit {
  constructor(private quesserv: QuestionserviceService,private router: Router,private contestserv:ContestService) { }
  Contest: [contest];
  contestname: String;
  keys;
  length: number;
  user_chosen_contest : contest;
  ngOnInit() {

    this.quesserv.getAllContests().subscribe(Contest =>
      {
        this.Contest = Contest;
        this.Contest.sort((a, b) => a.Start_time > b.Start_time ? 1 : a.Start_time < b.Start_time ? -1 : 0);

        console.log(this.Contest);

      });

  }
  // get questions of particular contest chosen by user
  /*getQuestions(id){
    this.contestserv.setdata(id);
    //this.router.navigate(['/questioncomp']);

    // finding the contest which  user has chosen (button click)
    for(var i =0 ;i<this.Contest.length;i++){
      if(this.Contest[i]._id  ==  id){
        break;
        // breaking when we found the index of user chosen contest
      }
    }
    this.user_chosen_contest = this.Contest[i];

    var today =new Date();
    var contest_starts_at =new Date (this.user_chosen_contest.Start_time);
    var contest_ends_at = new Date (this.user_chosen_contest.End_time);
     console.log(today);
     console.log(contest_starts_at);

      if(today < contest_starts_at){
        alert('OOPS! Contest starts at '+contest_starts_at);
      }
      else if(today > contest_ends_at){
         alert('OOPS! contest has already ended');
       }

      else{
      this.router.navigate(['/playquiz']);
      }
  }*/


  deleteChosenContest(id){

    var response =  confirm('Are you sure you want to delete the contest?');

    if( response == true){
      this.quesserv.deleteContest(id).subscribe( result =>{
        this.refetchContests();
      })

    }else{
      alert('something went wrong');
    }
  }
  refetchContests(){

    this.quesserv.getAllContests().subscribe(Contest =>
      {
        this.Contest = Contest;
        console.log(this.Contest);

      });

  }

  editOrViewContest(cid){
      this.contestserv.setdata2(cid);
      this.router.navigate(['//editcontest']);
  }
  check(){
    alert('jghd');
  }
}

