import { Component, OnInit } from '@angular/core';
import {QuestionserviceService} from '../service/questionservice.service'
import {  question } from '../models/question';
import { contest } from '../models/contest';
import { leaderBoard } from '../models/Leaderboard';
import {Router} from '@angular/router';
import {CalendarModule} from 'primeng/calendar'
import {ContestService} from '../service/contest.service';
import { Time } from '@angular/common';


@Component({
  selector: 'app-addquestions',
  templateUrl: './addquestions.component.html',
  styleUrls: ['./addquestions.component.css']
})
export class AddquestionsComponent implements OnInit {

  constructor(private quesservice:QuestionserviceService, private router: Router,private contserv:ContestService) { }
  tags:[string] = ["trial"];
    /*ques: Question;
    length: number;
    question_title: String;
    op1: String;
    op2: String;
    op3: String;
    op4: String;
    answer: String;

  ngOnInit() {
    this.quesservice.getQuestions().subscribe(ques=>
      {this.ques = ques;
        this.length=Object.keys(this.ques).length;
      })
  }




  addtheques(){
  this.length = this.length+1;
  let newQues = {
      qno: this.length.toString(),
      title: this.question_title,
      op1: this.op1,
      op2: this.op2,
      op3: this.op3,
      op4: this.op4,
      answer: this.answer
    }
    this.quesservice.addQuestion(newQues).subscribe( newQues =>
      alert("added question"))


  }*/
  //contest parameters

  //contest_id:String;

  //question parameters
  newoption:String;
  //problem_no: string = "1";
  title: String;
  author:String;
  options: [{option_no : Number,
    content: String}] = [{option_no:0,content:''}];
  answer:[number] = [0];
  text_answer:[String] = [""];
  domain:String;
  subdomain: String;
  keywords:[String] = [""];
  company_tags:[String] = [""];
  marks:number;
  level:String;
  type: String;
  description: String;
  explanation : String;

    temp_options:[String] = [''];
  Questions: [question]=[{

      'title':'x',
      'options': [{option_no:0,content:''}],
      'text_answer':['x'],
      'domain':'c programming',
      'keywords':['variables'],
      'marks':5,
      'level':'easy',
      'type':'radio'

}] ; //initializing with dummy question so that undefind error is resolved
  newquestion: question;
  text_ans_array:[String] = [""]; // for fill in the blanks
  number_ans_array:[number]=[0]; // for mcqs



// other calculation parameters

  quizflag=0;
  questionflag=0;
  done=0;
  ans:String;
  optionflag=0;
  ansflag=0;
  kwflag =0 ;
  ctflag =0 ;

  fibansflag=0;

  option_no;
  text_ans:string = "";
  keyword: string ="";
  company_tag:string="";

  ngOnInit(){
    //removing dummy questions
    this.Questions.pop();
     this.options.pop();
    this.text_ans_array.pop();
    this.number_ans_array.pop();

    this.keywords.pop();
    this.company_tags.pop();

  }




  /*addAnotherQuestion(title,domain,keywords,answer,Description){

        this.options.shift();
      this.newquestion= {
        problem_no: this.problem_no,
        title:this.title,
        options:this.options,
        domain:this.domain,
        keywords:this.keywords,
        Description: this.Description,
        answer:this.ans,
        marks:this.marks,
        Level:this.Level

      }

      /*let n =this.Questions.push(this.newquestion);
      if(n>0){
        alert('added  question succesfully');
        this.questionflag=1;
      }
            // incrementing the question no/problem no
     // console.log('Questions are ' + this.Questitle);
     // alert('question added successfully');

     console.log('options are'+ this.options);

      parseInt(this.problem_no);
      this.problem_no =this.problem_no+1;
      this.problem_no.toString();
      this.options= [""];


}*/

    addOption(newoption){
      this.optionflag =1;
      //console.log(newoption);
      //this.temp_options.push(newoption);


     /* var option_object={
        option_no: option_no,
        content:newoption
      }
      this.options.push(option_object);

      console.log(this.options);*/

       var is_option_exists_flag =false;

      for(var i=0;i<this.temp_options.length;i++){
        if(newoption == this.temp_options[i]){
          is_option_exists_flag = true;
          alert("option  exists");
          break;
        }
      }

      if(is_option_exists_flag == false){
        this.temp_options.push(newoption);
      }



    }
    deleteoption(todeleteoption){
       for(var i=0;i<this.temp_options.length;i++){
         if(todeleteoption == this.temp_options[i]){
           break;
         }
       }
       this.temp_options.splice(i,1);
       console.log(this.temp_options);

    }

     /* postToContest(){
        /*for(let i=0;i<this.Questions.length;i++){
        console.log("The questions are"+this.Questions[i].title);
        }*/
        /*this.quesservice.postExistingQuestions(this.contest_id,this.Questions).subscribe(Questions=>
          console.log('posted successfully'));
        }*/


       addQuestionToDB(){

        // create actual options
        for(var i=0;i<this.temp_options.length;i++){
          var option_object={
          option_no: i+1,
          content:this.temp_options[i]
        }
        this.options.push(option_object);




        }

          this.newquestion= {
            title:this.title,
            options:this.options,
            domain:this.domain.toLowerCase(),
            subdomain:this.subdomain.toLowerCase(),
            keywords:this.keywords,
            company_tags:this.company_tags,
            description: this.description,
            answer:this.number_ans_array,
            text_answer: this.text_ans_array,
            marks:this.marks,
            level:this.level,
            explanation:this.explanation,
            type: this.type,
          }

          console.log(this.newquestion);
           this.quesservice.postQuestions(this.newquestion).subscribe(newquestion =>
             { alert('Successfully added question');
             window.location.reload();});

        }
      /*change(){
        console.log(this.Description);
      }*/

      // adding fib answer
      addFibAnswers(ans){
        this.fibansflag=1;
        this.text_ans_array.push(ans);
        console.log(this.text_ans_array);
      }

      //delelting fib answer
      deleteFibAnswer(todeleteanswer){
        for(var i=0;i<this.text_ans_array.length;i++){
          if(todeleteanswer == this.text_ans_array[i]){
            break;
          }
        }
        this.text_ans_array.splice(i,1);
        console.log(this.text_ans_array);
      }


      // mcq options
      addMcqAnswers(ans){
        this.ansflag=1;
        this.number_ans_array.push(ans);
        console.log(this.number_ans_array);
      }

      //deleting mcq answer

      deleteMcqAnswer(todeleteanswer){
        for(var i=0;i<this.number_ans_array.length;i++){
          if(todeleteanswer == this.number_ans_array[i]){
            break;
          }
        }
        this.number_ans_array.splice(i,1);
        console.log(this.number_ans_array);
      }


      // adding  and deleting keywords

      addKeywords(kw){
      kw=kw.toLowerCase();

        this.kwflag=1;
        this.keywords.push(kw);
        console.log(this.keywords);
      }

      //delelting fib answer
      deleteKeyword(kw_del){
        for(var i=0;i<this.keywords.length;i++){
          if(kw_del == this.keywords[i]){
            break;
          }
        }
        this.keywords.splice(i,1);
        console.log(this.keywords);
      }

      // adding and deleting company tags


      addCompanyTag(ct){
        ct=ct.toLowerCase();

          this.ctflag=1;
          this.keywords.push(ct);
          console.log(this.keywords);
        }

        //delelting fib answer
        deleteCompanyTag(ct_del){
          for(var i=0;i<this.keywords.length;i++){
            if(ct_del == this.keywords[i]){
              break;
            }
          }
          this.keywords.splice(i,1);
          console.log(this.keywords);
        }

        onTagsChanged(event:any){
          if(event.change == 'add'){
            console.log(this.keywords);
            console.log(this.tags[1].displayValue);
            console.log('wor');
          }
          else{

            console.log(this.keywords);
            console.log('remo');
          }
        }


  }







