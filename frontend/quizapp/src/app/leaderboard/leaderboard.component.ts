import { Component, OnInit } from '@angular/core';
import {QuestionserviceService} from '../service/questionservice.service';
import {leaderBoard} from '../models/leaderboard';
import {ContestService} from '../service/contest.service';
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor(private serviceVar:QuestionserviceService, private contserv: ContestService) { }

  result: leaderBoard;
  id:String;
  Rank: number=0;
  ngOnInit() {
    this.id = this.contserv.getdata();

  this.serviceVar.getResult(this.id).subscribe(result =>
    {this.result = result;
      console.log(this.result);
      result.sort((a, b) => a.result < b.result ? 1 : a.result > b.result ? -1 : 0);
      console.log('after sorting'+ this.result);
    });

  }

}
