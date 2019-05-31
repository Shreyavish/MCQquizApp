import { Component, OnInit } from '@angular/core';
import {QuestionserviceService} from '../service/questionservice.service';
import {ContestService} from '../service/contest.service';
import { contest } from '../models/contest';
import { questionpaper } from '../models/questionpaper';
import { question } from '../models/question';
import {Router} from '@angular/router';
@Component({
  selector: 'app-add-question-paper-to-contest',
  templateUrl: './add-question-paper-to-contest.component.html',
  styleUrls: ['./add-question-paper-to-contest.component.css']
})
export class AddQuestionPaperToContestComponent implements OnInit {

  constructor(private contserv: ContestService, private quesserv:QuestionserviceService,private router:Router) { };
  Contest_question_paper :questionpaper;
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
     // if the contest is getting edited fetch the question paper of the contest ans show that this uqestion paper was in the contest. YOu can opt to change the question paper.

    this.quesserv.getContestToEdit(this.contest_id).subscribe( Contest =>
      { this.Contest_question_paper = Contest.questionpaperid
        console.log(this.Contest_question_paper);
        //this.q._id =  this.Contest_question_paper._id;
        this.storeSelectedId(this.Contest_question_paper._id);

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
     { console.log(item);
      this.router.navigate(['/getcontests']);
    })
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
