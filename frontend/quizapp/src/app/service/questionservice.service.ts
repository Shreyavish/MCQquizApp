import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {contest} from '../models/contest';
import {question} from '../models/question';
import {leaderBoard} from '../models/leaderboard';
import {searchkey} from '../models/searchkey';
@Injectable({
  providedIn: 'root'
})
export class QuestionserviceService {

  constructor(private http:HttpClient) { }

    getQuestions(): Observable<any>{

      //let url='http://localhost:3000/quizapi/getquestions';
      let url='https://afternoon-bayou-53156.herokuapp.com/questions'
      return this.http.get(url);
    }

    postResult(result:leaderBoard,id) : Observable<any>{
      let url='http://localhost:3000/quizapi/postresult/'+id;
      return this.http.put(url,result)
    }

    getResult(id): Observable<any> {
      let url='http://localhost:3000/quizapi/getLeaderBoard/';
      return this.http.get(url+id);
    }


    createContest(contest): Observable<any>{

      return this.http.post('http://localhost:3000/quizapi/createContest',contest);
    }

    getAllContests(): Observable<any>{

      return this.http.get('http://localhost:3000/quizapi/getcontests');
    }

    getContestById(id):Observable<any>{
      let url='http://localhost:3000/quizapi/getContest/'+id;
      return this.http.get(url);
    }

    getExistingQuestiond():Observable<any>{
      //let url='http://localhost:3000/quizapi/getquestions';
      let url='https://afternoon-bayou-53156.herokuapp.com/questions'
      return this.http.get(url);
    }

    postExistingQuestions(id,questions:[question]):Observable<any>{
      let url='http://localhost:3000/quizapi/addQuestionsToContest/'+id;

      return this.http.put(url,questions);
    }

     getContestToEdit(id) : Observable<any>{
       let url ='http://localhost:3000/quizapi/getContest/'+id;
       return this.http.get(url);
     }

      editContest(id,contes: contest) :Observable<any>{
        let url='http://localhost:3000/quizapi/editContest/'+id;
        return this.http.put(url,contes);
      }

      postQuestions (ques:question) : Observable<any>{
        let url='http://localhost:3000/quizapi/addquestion';
        return this.http.post(url,ques);
      }

      searchByDomainKeyword(item: searchkey):Observable<any>{

         let url = 'http://localhost:3000/quizapi/search';
         return this.http.post(url,item);
      }

      deleteContest(id): Observable<any>{
      let url ='http://localhost:3000/quizapi/deleteContest/'+id;
      return this.http.delete(url);
      }

      getOnlyContestDetails (id) : Observable<any>{
        let url ="http://localhost:3000/quizapi/getOnlyContestDetails/"+id;
        return this.http.get(url);
      }

      postResultFirstTime(result) : Observable<any>{
        let url="http://localhost:3000/quizapi/postfirsttime";
        return this.http.post(url,result);
      }

      postTempResult(result,id) :Observable<any>{
        let url ="http://localhost:3000/quizapi/posttempresult/"+id;
        return this.http.put(url,result);
      }

      postQuestionPaper(item):Observable<any>{

        let url = "http://localhost:3000/quizapi/createQuestionPaper";
        return this.http.post(url,item);
      }

      getQuestionPapers():Observable <any>{
        let url ="http://localhost:3000/quizapi/getAvailableQuestionPapers";
        return this.http.get(url);
      }

      postQuestionPaperToContest(id,item):Observable<any>{
        let url = "http://localhost:3000/quizapi/addQuesPaperToContest/"+id;
        return this.http.put(url,item);
      }


      filterByLevel(item):Observable<any>{
        let url = "http://localhost:3000/quizapi/filterbylevel";
        return this.http.post(url,item);
      }


      filterByType(item):Observable<any>{
        let url = "http://localhost:3000/quizapi/filterbytype";
        return this.http.post(url,item);
      }
}
