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

    getQuestions(id): Observable<any>{

      let url='http://localhost:3000/quizapi/getContest/'+id;
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

    getContest(): Observable<any>{

      return this.http.get('http://localhost:3000/quizapi/getcontests');
    }

    getContestById(id):Observable<any>{
      let url='http://localhost:3000/quizapi/getContest/'+id;
      return this.http.get(url);
    }

    getExistingQuestiond():Observable<any>{
      let url='http://localhost:3000/quizapi/getquestions';
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
        let url='http://localhost:3000/quizapi/addquestions';
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

}
