import {Component,OnInit
} from '@angular/core';
import {QuestionserviceService
} from '../service/questionservice.service';
import {
	question
} from '../models/question';
import {
	ContestService
} from '../service/contest.service';
import {
  searchkey
} from '../models/searchkey';
import {
  contest
} from '../models/contest';

@Component({
	selector: 'app-get-existing-questions',
	templateUrl: './get-existing-questions.component.html',
	styleUrls: ['./get-existing-questions.component.css']
})
export class GetExistingQuestionsComponent implements OnInit {

	constructor(private queserv: QuestionserviceService, private contserv: ContestService) {}
	//UI  Related
	p: number = 1;
	x: number = 3;
	nofpages: number = 2; //default
	collapse_flag: boolean = false;
  q: question ;
marks:number;
  //contest questions related
  toEditContest: contest;
  cont_ques:[question] = [{

		"title": "dummy",
		"options": [""],
		"answer": [""],
		"domain": "",
		"keywords": "",
		"marks": 5,
		"Level": "",
		"Type": ""
	}, ]; // dummy array

  //search related
  value_of_sk: String ;//value of search key
  key: searchkey={"search_key":""};


  ///question relates
	questions: [question];
	question_selected: question;
	question_selected_array: [question] = [{

		"title": "dummy",
		"options": [""],
		"answer": [""],
		"domain": "",
		"keywords": "",
		"marks": 5,
		"Level": "",
		"Type": ""
	}, ]; // intializing with a dummy question



    // final array of questions

    ques_final : [question] = [{

      "title": "dummy",
      "options": [""],
      "answer": [""],
      "domain": "",
      "keywords": "",
      "marks": 0,
      "Level": "",
      "Type": ""
    }, ]



	qid: String;
	found_flag: boolean = false;
	flag: boolean = false; //flag to remove the dummy in question selected array;
	contest_id: String;
	ngOnInit() {
    this.ques_final.pop();
    this.question_selected_array.pop();
    this.cont_ques.pop();

		this.queserv.getExistingQuestiond().subscribe(questions => {
			this.questions = questions;
      console.log(this.questions);

		});
    this.contest_id = this.contserv.getdata2();



   // if the contest has questions already, get them to edit/delete

    this.queserv.getContestToEdit(this.contest_id).subscribe(toEditContest=>
      {this.toEditContest = toEditContest;
        this.cont_ques= this.toEditContest.Questions;
        console.log(this.cont_ques);

        for(var i=0;i<this.cont_ques.length;i++){
          this.ques_final.push(this.cont_ques[i]);

        }
       // to remove dummy question

      })




	}


	addexistQuesToContest() {


    //final questions are = recently added questions + changes made to already existed contest questions
    //for(var i =0 ;i<this.cont_ques.length;i++){
      //  this.question_selected_array.push(this.cont_ques[i]);

    //}

    //this.question_selected_array.push();
	//	console.log("final question are"+this.question_selected_array);

		this.queserv.postExistingQuestions(this.contest_id, this.ques_final).subscribe(ques_final =>
		console.log(ques_final));
	}

	pushToQuestionsArray(ques: question,marks:number) {

		/*if (this.flag == false) {
			this.ques_final.shift();
			this.flag = true;
    }*/


    this.question_selected = ques;
    this.question_selected.marks=marks;
		console.log(this.question_selected);
		this.found_flag = false;

    // while unchecking => remove questions :splice
    		for (let i = 0; i < this.ques_final.length; i++) {
			if (this.question_selected == this.ques_final[i]) {
				this.ques_final.splice(i, 1);
				this.found_flag = true;
				break;
			}

		}

		if (this.found_flag == false) {
			this.ques_final.push(this.question_selected);
			//console.log(this.question_final_array);
		}

		console.log('The current questions are:' + this.ques_final.length);

	}

	selected(nofpages) {
		this.nofpages = nofpages;
	}

	collapse(q) {
		q.collapse_flag = !q.collapse_flag;
		this.q.collapse_flag = q.collapse_flag;
		console.log(this.collapse_flag)
	}

   searchQuery(value_of_sk){
     this.key={
       "search_key":this.value_of_sk.toLowerCase()
     }
     this.queserv.searchByDomainKeyword(this.key).subscribe(questions =>
      {this.questions = questions,
        console.log(this.questions);
      })
   }

   removeQuesFromArray(ques:question){
    for(var i=0;i<this.ques_final.length;i++){
      if(this.ques_final[i] == ques ){
        break;
      }
    }
    this.ques_final.splice(i,1);
    console.log("The current questions are :"+this.ques_final);
  }


}
