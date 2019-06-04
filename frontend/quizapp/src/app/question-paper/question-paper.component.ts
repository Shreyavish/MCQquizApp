import { Component, OnInit,ViewChild } from '@angular/core';
import {QuestionserviceService} from '../service/questionservice.service'
import {questionpaper}from '../models/questionpaper';
import {searchkey} from '../models/searchkey'
import {question} from '../models/question';
  import { from } from 'rxjs';
import { ContestService } from '../service/contest.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-question-paper',
  templateUrl: './question-paper.component.html',
  styleUrls: ['./question-paper.component.css']
})
export class QuestionPaperComponent implements OnInit {

  constructor(private quesserv:QuestionserviceService,private contserv : ContestService,private router:Router) { }


  title: string;
  no_of_sections : number;
  sections : [{name:string,questions:[string]}] = [{name:"",questions:[""]}];
  questions : [question];
  crnt_questions : [question];
  total_marks:number=0;

  crnt_section_being_edited:string="";

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
final_sections=[];
section_ids =[];
id_of_section_being_updated ;
temp_questions=[];

type: string;
level: string= "Beginner";
is_section_being_edited= false;


update_qpaper =false;

qpaper_id_of_editing = this.contserv.getqpaperid();
  ngOnInit() {
    this.sections.pop();
    this.section_names.pop();
    this.temp_sections.pop();
    this.final_sections.pop();

    console.log(this.qpaper_id_of_editing);
    if(this.qpaper_id_of_editing != undefined){

      this.update_qpaper = true;
      this.quesserv.getQuestionPaper(this.qpaper_id_of_editing).subscribe(qpaper=>{
        this.title = qpaper.title;
        for(var i = 0;i<qpaper.sections.length;i++){
            this.temp_sections.push(qpaper.sections[i]);

            console.log(this.temp_sections);
        }
        for(i=0;i<this.temp_sections.length;i++){
          this.section_ids.push(this.temp_sections[i]._id);
        }
      })
    }

    this.quesserv.getQuestions().subscribe(questions =>
      {this.crnt_questions = questions;


        for(var i=0;i<this.crnt_questions.length;i++){
         this.crnt_questions[i].collapse_flag=false;
        // this.crnt_questions[i].checked = false;

        }
        console.log(this.crnt_questions);

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
      {this.crnt_questions = questions,
        console.log(this.crnt_questions);
      })
   }

   // when create contest button is clicked
   saveChanges()

    {


      if(this.section_name.length <=0){
        alert('please give a name to the section first');

        this.temp_questions=[];
        for(var i=0;i<this.crnt_questions.length;i++){

          this.crnt_questions[i].checked = false;

         }
      }
      else{
      if(this.temp_questions.length <=0){
        alert('please add atleast one questions');
      }
      else{


        var sec_found ;

        for(var i =0;i<this.temp_sections.length;i++){
          sec_found = false;
          if(this.temp_sections[i].name == this.section_name){
            sec_found = true;
            break;
          }
        }
        // case 1: the section is already there but you want to add some more questions
        if(sec_found == true){
        console.log(this.temp_questions);

          // push the newly added questions to the crnt section

          for(var j =0;j<this.temp_questions.length;j++){
            this.temp_sections[i].questions.push( this.temp_questions[j]);
          }


        console.log(this.temp_sections[i]);

          var updateques = {
            "questions" : this.temp_sections[i].questions
          }
          this.quesserv.updateSection(updateques,this.temp_sections[i]._id).subscribe(res=>
            {
              console.log(res);
            })


        this.temp_questions=[];
        for(var i=0;i<this.crnt_questions.length;i++){

          this.crnt_questions[i].checked = false;

         }
        }
        else{


              // case 2: create a new section
      this.section_names.push(this.section_name);
      // generating question ids
      /*var ques_ids = [];
      for(var i=0;i<this.temp_questions.length;i++){
        ques_ids.push(this.temp_questions[i]._id)
      }*/
      var new_section = {
        name: this.section_name,
        questions: this.temp_questions
      }
     // console.log(ques_ids);
     // this.temp_sections.push(new_section);
      this.quesserv.addNewSection(new_section).subscribe(sec =>{
        this.section_ids.push(sec._id);
       this.temp_sections.push(sec);
       console.log(this.temp_sections);
       this.temp_questions = [];
      })


     //  console.log(this.temp_sections);
      for(var i=0;i<this.crnt_questions.length;i++){

        this.crnt_questions[i].checked = false;

       }

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
          for(var j=0;j<this.temp_sections[i].questions.length;j++){

            if(qid == this.temp_sections[i].questions[j]._id){
              console.log('found question');
              this.temp_sections[i].questions.splice(j,1);
              break;

            }
          }
        }
      }
      console.log(this.temp_sections);
    }

 // total marks yet to be implemented
    submitQuesPaper(){

      //this.makeFinalSections();
      let fin_ques_paper = {
        "title" :this.title,
        "sections" : this.section_ids,
        "total_marks" : 40
      }
      console.log(fin_ques_paper);

      if(fin_ques_paper.sections.length <=0)
      {
        alert("Please add atleast one section");
      }
      else{
      if(this.update_qpaper == false){
      this.quesserv.postQuestionPaper(fin_ques_paper).subscribe(item=>{
        console.log(item);
        this.router.navigate(['/availablequestionpapers']);
      })
    }else{
      this.quesserv.updateQpaper(this.qpaper_id_of_editing,fin_ques_paper).subscribe(item=>{
        console.log(item);
        this.router.navigate(['/availablequestionpapers']);
      })
    }
    }
  }

    // they will contain only the question ids in their questions as we defined in our schema of backend

    makeFinalSections(){

       var id_array = [];

       for(var i=0;i<this.temp_sections.length;i++){

       for(var j=0;j<this.temp_sections[i].questions.length;j++){
        id_array.push(this.temp_sections[i].questions[j]._id)
      }
      console.log(id_array);

      let temp ={
        name: this.temp_sections[i].name,
        questions:id_array
      };
      this.final_sections.push(temp);
      id_array=[];

    }


    }

    close()
    {
      this.IsmodelShow=true;// set false while you need open your model popup
     // do your more code
     console.log('working');
  }

  filteringByLevel(op){

    this.temp_questions =[];
    let level_obj = {
      level : op
    }
    console.log(op);
    this.quesserv.filterByLevel(level_obj).subscribe(questions=>{
      this.crnt_questions = questions;
      for(var i=0;i<this.crnt_questions.length;i++){
        this.crnt_questions[i].collapse_flag=false;
        this.crnt_questions[i].checked = false;

       }
    })
  }

  filteringByType(op){
    this.temp_questions = [];


    let type_obj = {
      type : op
    }
    this.quesserv.filterByType(type_obj).subscribe(questions=>{
      this.crnt_questions = questions;
      for(var i=0;i<this.questions.length;i++){
        this.crnt_questions[i].collapse_flag=false;
        this.crnt_questions[i].checked = false;

       }
      })
    }


    deleteSection(id){

      this.quesserv.deleteSection(id).subscribe(res=>{
        console.log("The deleted is"+res);
        console.log("deleted");
        for(var i=0;i<this.temp_sections.length;i++){
          if(this.temp_sections[i]._id == id){

            this.temp_sections.splice(i,1);
            break;
          }
        }
        for(var i=0;i<this.section_ids.length;i++){
          if(this.section_ids[i] == id){
            this.section_ids.splice(i,1);
            break;
          }
        }
        console.log(this.section_ids);
      })



    }




  editExistingSection(sec_name){


    //this.crnt_section_being_edited = sec_name;
    this.section_name = sec_name;
  this.is_section_being_edited = true;

    /*for(var i =0;i<this.temp_sections.length;i++){
      if(this.temp_sections[i].name == sec_name){
        break;
      }
    }*/

   /* for(var j = 0;j<this.temp_sections[i].content.length;j++){
        for(var k=0;k<this.crnt_questions.length;k++){


            if(this.crnt_questions[k]._id == this.temp_sections[i].content[j]._id){
              console.log('found');
              console.log(this.crnt_questions[k].title);

              this.crnt_questions[k].checked = true;
              console.log(this.crnt_questions[k].checked);
              break;
            }
          }
        }
        for(var i=0;i<this.crnt_questions.length;i++){
          console.log(this.crnt_questions[i].checked);
        }*/

  }

  /*saveChanges(){


  for(var i =0;i<this.temp_sections.length;i++){
      if(this.temp_sections[i].name == this.crnt_section_being_edited){
        break;
      }
    }

    console.log(this.temp_questions);
    this.temp_sections[i].content= this.temp_questions;
    console.log(this.temp_sections[i]);
    this.temp_questions=[];



  }*/
  deleteQPaper(){
    this.quesserv.deleteQuestionPaper(this.qpaper_id_of_editing).subscribe(item=>{
      console.log('deleted successfully');
      this.router.navigate(['/availablequestionpapers']);
    })
  }
}
