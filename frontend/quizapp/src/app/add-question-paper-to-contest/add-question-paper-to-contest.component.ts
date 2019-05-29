import { Component, OnInit } from '@angular/core';
import {QuestionserviceService} from '../service/questionservice.service';
import {ContestService} from '../service/contest.service';

@Component({
  selector: 'app-add-question-paper-to-contest',
  templateUrl: './add-question-paper-to-contest.component.html',
  styleUrls: ['./add-question-paper-to-contest.component.css']
})
export class AddQuestionPaperToContestComponent implements OnInit {

  constructor(private contserv: ContestService, private quesserv:QuestionserviceService) { };

  question_papers = [];
  sections = [];
  title;
  question_content = [];

  contest_id = this.contserv.getdata2();
selected_question_paper_id;
  ngOnInit(){
    this.quesserv.getQuestionPapers().subscribe(question_papers=>{
      this.question_papers = question_papers;


     })
  }


  storeSelectedId(id){
    this.selected_question_paper_id = id;
    this.viewQuesPaper(id);
    }

  submitQuespaper(){

    let qpaper = {
      qpaperid : this.selected_question_paper_id
    }
    this.quesserv.postQuestionPaperToContest(this.contest_id,qpaper).subscribe(item=>
      console.log(item))
  }

  viewQuesPaper(id){

    var req_qpaper_index ;
    for(var i =0 ;i<this.question_papers.length;i++){
      if(this.question_papers[i]._id == id){
          req_qpaper_index = i;
        break;
      }
    }
     this.sections = this.question_papers[req_qpaper_index].section;

  }


}
