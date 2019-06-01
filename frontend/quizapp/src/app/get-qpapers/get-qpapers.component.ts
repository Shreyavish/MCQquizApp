import { Component, OnInit } from '@angular/core';
import {QuestionserviceService} from '../service/questionservice.service';
import {Router} from '@angular/router'
import{ContestService} from '../service/contest.service';
@Component({
  selector: 'app-get-qpapers',
  templateUrl: './get-qpapers.component.html',
  styleUrls: ['./get-qpapers.component.css']
})
export class GetQpapersComponent implements OnInit {

  constructor( private quesserv: QuestionserviceService,private contserv:ContestService,private router:Router) { }
  qpapers = [];
  ngOnInit() {
    this.quesserv.getQuestionPapers().subscribe(items=>{
      this.qpapers = items;
      console.log(this.qpapers);
    })
  }

  editQuestionPaper(id){
    this.contserv.setqpaperid(id);
    this.router.navigate(['/questionpaper']);

  }
}
