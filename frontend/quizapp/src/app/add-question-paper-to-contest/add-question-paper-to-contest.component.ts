import { Component, OnInit } from '@angular/core';
import {QuestionserviceService} from '../service/questionservice.service';


@Component({
  selector: 'app-add-question-paper-to-contest',
  templateUrl: './add-question-paper-to-contest.component.html',
  styleUrls: ['./add-question-paper-to-contest.component.css']
})
export class AddQuestionPaperToContestComponent implements OnInit {

  constructor(private quesserv: QuestionserviceService) { }
contest_id = "";
  question_papers = [];

  ngOnInit(){
    this.quesserv.getQuestionPapers().subscribe(question_papers=>{
      this.question_papers = question_papers

    })
  }

}
