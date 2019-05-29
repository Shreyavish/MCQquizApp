import { Component, OnInit,ViewChild } from '@angular/core';
import {QuestionserviceService} from '../service/questionservice.service'
import {questionpaper}from '../models/questionpaper';
import {searchkey} from '../models/searchkey'
import {question} from '../models/question';
  import { from } from 'rxjs';


@Component({
  selector: 'app-question-paper',
  templateUrl: './question-paper.component.html',
  styleUrls: ['./question-paper.component.css']
})
export class QuestionPaperComponent implements OnInit {

  constructor(private quesserv:QuestionserviceService) { }


  title: string;
  no_of_sections : number;
  sections : [{name:string,question_content:[string]}] = [{name:"",question_content:[""]}];
  questions : [question];
  total_marks:number=0;

  crnt_section_name:string="";

  nofpages: number = 5; //default
  collapse_flag: boolean = false;

  //search related
  value_of_sk: String ;//value of search key
  key: searchkey={"search_key":""};

  section_names: [String] = [""];
  section_name:String ="";
  IsmodelShow = false;
  q: question ;
temp_sections=[];
final_sections:[{name : string,question_content:[string]}]=[{name:"",question_content:[""]}];

temp_questions=[];

type: string;
level: string= "Beginner";
  ngOnInit() {
    this.sections.pop();
    this.section_names.pop();
    this.temp_sections.pop();
    this.final_sections.pop();
    this.quesserv.getQuestions().subscribe(questions =>
      {this.questions = questions;


        for(var i=0;i<this.questions.length;i++){
         this.questions[i].collapse_flag=false;
         this.questions[i].checked = false;

        }
        console.log(this.questions);

      })
  }

  selected(nofpages) {
		this.nofpages = nofpages;
	}


	collapse(q) {
		q.collapse_flag = !q.collapse_flag;
		this.q.collapse_flag = q.collapse_flag;
		//console.log(this.collapse_flag)
	}

   searchQuery(value_of_sk){
     this.key={
       "search_key":this.value_of_sk.toLowerCase()
     }
     console.log("searching");
     this.quesserv.searchByDomainKeyword(this.key).subscribe(questions =>
      {this.questions = questions,
        console.log(this.questions);
      })
   }

   // when create contest button is clicked
   addToSections(sname)

    {

      if(this.section_name.length <=0){
        alert('please give a name to the section');
      }
      else{
      if(this.temp_questions.length <=0){
        alert('please add atleast one questions');
      }
      else{

        // case 1: the section is already there but you want to add some more questions


        // case 2: create a new section
      this.section_names.push(sname);
      var new_section = {
        name:sname,
        content: this.temp_questions
      }
      this.temp_sections.push(new_section);
      this.temp_questions = [];

     //  console.log(this.temp_sections);
      for(var i=0;i<this.questions.length;i++){

        this.questions[i].checked = false;

       }

      }
    }
  }

    // when checkboxes are checkd and unchecked
    saveQuestions(ques, ischecked){

      if(ischecked == true){
        this.temp_questions.push(ques);

      }
      else{
        for(var i=0;i<this.temp_questions.length;i++){
          if(this.temp_questions[i] == ques){
            this.temp_questions.splice(i,1);
          }
        }
      }
      console.log(this.temp_questions);



    }


    removeQuestionFromSection(sname,qid){
      console.log(sname);
      console.log(qid);
      for(var i=0;i<this.temp_sections.length;i++){
        if(sname == this.temp_sections[i].name){
          console.log('found section');
          for(var j=0;j<this.temp_sections[i].content.length;j++){

            if(qid == this.temp_sections[i].content[j]._id){
              console.log('found question');
              this.temp_sections[i].content.splice(j,1);

            }
          }
        }
      }
      console.log(this.temp_sections);
    }

 // total marks yet to be implemented
    submitQuesPaper(){
      this.makeFinalSections();
      let fin_ques_paper = {
        "title" :this.title,
        "section" : this.final_sections,
        "total_marks" : 40
      }
      console.log(fin_ques_paper);
      this.quesserv.postQuestionPaper(fin_ques_paper).subscribe(item=>{
        console.log(item);
        window.location.reload();
      })

    }

    // they will contain only the question ids in their content as we defined in our schema of backend

    makeFinalSections(){
       var id_array = [];

       for(var i=0;i<this.temp_sections.length;i++){

       for(var j=0;j<this.temp_sections[i].content.length;j++){
        id_array.push(this.temp_sections[i].content[j]._id)
      }

      let temp ={
        name: this.temp_sections[i].name,
        question_content:id_array
      };
      //this.final_sections.push(temp);
    }


    }

    close() {
      this.IsmodelShow=true;// set false while you need open your model popup
     // do your more code
     console.log('working');
  }

  filteringByLevel(op){

    let level_obj = {
      level : op
    }
    console.log(op);
    this.quesserv.filterByLevel(level_obj).subscribe(questions=>{
      this.questions = questions;
      for(var i=0;i<this.questions.length;i++){
        this.questions[i].collapse_flag=false;
        this.questions[i].checked = false;

       }
    })
  }

  filteringByType(op){

    let type_obj = {
      type : op
    }
    this.quesserv.filterByType(type_obj).subscribe(questions=>{
      this.questions = questions;
      for(var i=0;i<this.questions.length;i++){
        this.questions[i].collapse_flag=false;
        this.questions[i].checked = false;

       }
    })
  }


}
