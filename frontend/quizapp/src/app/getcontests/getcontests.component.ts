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
  ngOnInit() {

    this.quesserv.getContest().subscribe(Contest =>
      {
        this.Contest = Contest;
        console.log(this.Contest);
        this.keys = Object.keys(this.Contest);
        this.length =this.keys.length;
      });
  }
  getQuestions(id){
    this.contestserv.setdata(id);
    this.router.navigate(['/questioncomp']);
  }
}

