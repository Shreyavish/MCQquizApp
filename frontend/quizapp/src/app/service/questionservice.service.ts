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
      //let url='https://afternoon-bayou-53156.herokuapp.com/questions'
      //let url='http://quizapp01.herokuapp.com/questions'
      let url= "http://localhost:1337/questions"
      return this.http.get(url);
    }

   /* postResult(result:leaderBoard,id) : Observable<any>{
     // let url='http://localhost:3000/quizapi/postresult/'+id;
     let url = 'http://localhost:1337/contests/'+id;
      return this.http.put(url,result)
    }*/

    getResult(id): Observable<any> {
      let url='http://localhost:3000/quizapi/getLeaderBoard/';
      return this.http.get(url+id);
    }


    createContest(contest): Observable<any>{

      let url = "http://localhost:1337/contests";
      return this.http.post(url,contest);

   //   return this.http.post('http://localhost:3000/quizapi/createContest',contest);
    }

    getAllContests(): Observable<any>{
      let url = "http://localhost:1337/contests";
      return this.http.get(url);

      //return this.http.get('http://localhost:3000/quizapi/getcontests');
    }

    getContestById(id):Observable<any>{
      //let url='http://localhost:3000/quizapi/getContest/'+id;
      let url ='http://localhost:1337/contests/'+id;
      return this.http.get(url);
    }

    getExistingQuestiond():Observable<any>{
      let url='http://localhost:3000/quizapi/getquestions';
    //  let url='https://afternoon-bayou-53156.herokuapp.com/questions'

      return this.http.get(url);
    }

    postExistingQuestions(id,questions:[question]):Observable<any>{
      let url='http://localhost:3000/quizapi/addQuestionsToContest/'+id;

      return this.http.put(url,questions);
    }

     getContestToEdit(id) : Observable<any>{
      // let url ='http://localhost:3000/quizapi/getContest/'+id;
      let url ="http://localhost:1337/contests/" + id;
       return this.http.get(url);
     }

      editContest(id,contes: contest) :Observable<any>{
        //let url='http://localhost:3000/quizapi/editContest/'+id;
        let url ="http://localhost:1337/contests/" + id;
        return this.http.put(url,contes);
      }

      postQuestions (ques:question) : Observable<any>{
        //let url='http://localhost:3000/quizapi/addquestion';
        //let url = 'http://quizapp01.herokuapp.com/questions/';
        let url ="http://localhost:1337/questions";

        return this.http.post(url,ques);
      }

      searchByDomainKeyword(item: searchkey):Observable<any>{

         let url = 'http://localhost:3000/quizapi/search';
         return this.http.post(url,item);
      }

      deleteContest(id): Observable<any>{
      //let url ='http://localhost:3000/quizapi/deleteContest/'+id;
      let url = "http://localhost:1337/contests/"+id;
      return this.http.delete(url);
      }

      getContestDetails (id) : Observable<any>{
        //let url ="http://localhost:3000/quizapi/getOnlyContestDetails/"+id;
        let url ="http://localhost:1337/contests/"+id;
        return this.http.get(url);
      }

      postResultFirstTime(result) : Observable<any>{
        //let url="http://localhost:3000/quizapi/postfirsttime";
        let url = "http://localhost:1337/leaderboarditems";
        return this.http.post(url,result);
      }
      // this stores the results into leaderboarditems
      postTempResult(result,id) :Observable<any>{
        //let url ="http://localhost:3000/quizapi/posttempresult/"+id;
        let url = "http://localhost:1337/leaderboarditems/"+id;
        return this.http.put(url,result);
      }
      // in contes we just store ids os user results obtained from postresultfirsttime ans posttempresult routes
      // we just update the leaderboard items by pushing new items
      postUserResultIdsToContest(resids,id){
        let url ="http://localhost:1337/contests/"+id;
        return this.http.put(url,resids);

      }

      postQuestionPaper(item):Observable<any>{

  //        let url = "http://localhost:3000/quizapi/createQuestionPaper";
  let url = "http://localhost:1337/questionpapers";
        return this.http.post(url,item);
      }

      getQuestionPapers():Observable <any>{
       // let url ="http://localhost:3000/quizapi/getAvailableQuestionPapers";
       let url = "http://localhost:1337/questionpapers";
        return this.http.get(url);
      }

      postQuestionPaperToContest(id,item):Observable<any>{
        //let url = "http://localhost:3000/quizapi/addQuesPaperToContest/"+id;
        let url ="http://localhost:1337/contests/"+id;
        return this.http.put(url,item);
      }

      getQuestionPaper(id):Observable<any>{
       // let url = 'http://localhost:3000/quizapi/getQuestionPaper/'+id;
       let url ="http://localhost:1337/questionpapers/"+id;
        return this.http.get(url);
      }

      updateQpaper(id,item):Observable<any>{
        //let url = 'http://localhost:3000/quizapi/updateQuestionPaper/'+id;
        let url = "http://localhost:1337/questionpapers/" + id;
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
      deleteQuestionPaper(id): Observable<any>{
        //let url = 'http://localhost:3000/deleteQpaper/'+id;
        let url = 'http://localhost:1337/questionpapers/'+id;
        return this.http.delete(url);
      }

      addNewSection(item):Observable<any>{
        let url = 'http://localhost:1337/sections';
        return this.http.post(url,item);
      }

      updateSection(item,id):Observable<any>{
        let url = 'http://localhost:1337/sections/'+id;
        return this.http.put(url,item);
      }

      deleteSection(id):Observable <any>{
        let url = 'http://localhost:1337/sections/' + id;
        return this.http.delete(url);
      }

}

