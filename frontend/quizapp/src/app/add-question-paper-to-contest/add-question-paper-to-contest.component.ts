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
contest_id;
  is_contest_being_edited = this.contserv.geteditcontest();
  q;

 is_empty_quespaper = false;

selected_question_paper_id;
  ngOnInit(){
    this.contest_id = this.contserv.getdata2();
    this.quesserv.getQuestionPapers().subscribe(question_papers=>{
      this.question_papers = question_papers;
      console.log(this.question_papers);
      // initially the first question paper is selected and displayed on UI
      this.selected_question_paper_id = this.question_papers[0]._id;

     })
     // if the contest is getting edited fetch the question paper of the contest ans show that this uqestion paper was in the contest. YOu can opt to change the question paper.

     //if(this.is_contest_being_edited == true){

    this.quesserv.getContestToEdit(this.contest_id).subscribe( Contest =>
      { this.Contest_question_paper = Contest.questionpaper
        console.log(this.Contest_question_paper);
        //this.q._id =  this.Contest_question_paper._id;
        if(this.Contest_question_paper == undefined){
          this.is_empty_quespaper = true;
         this.storeSelectedId(this.question_papers[0]._id);
        }else{
          this.is_empty_quespaper = false;
        this.storeSelectedId(this.Contest_question_paper._id);
        }
      })
    //}

  }


  storeSelectedId(id){
    this.selected_question_paper_id = id;
    //q._id = this.selected_question_paper_id;
    console.log(id);
    this.viewQuesPaper(id);
    }

  submitQuespaper(){

    let qpaper = {
      questionpaper : this.selected_question_paper_id
    }
    console.log(qpaper);
   this.quesserv.postQuestionPaperToContest(this.contest_id,qpaper).subscribe(item=>
     { console.log(item);
      this.contserv.seteditcontest(false);
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
     this.sections = this.question_papers[req_qpaper_index].sections;

  }


}
