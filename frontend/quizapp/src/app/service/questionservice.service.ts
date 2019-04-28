import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '../models/question';
@Injectable({
  providedIn: 'root'
})
export class QuestionserviceService {

  constructor(private http:HttpClient) { }

    getQuestions(): Observable<any>{

      return this.http.get('http://localhost:3000/quizapi/getquestions');
    }

    addQuestion(question:Question): Observable<any>{

      return this.http.post('http://localhost:3000/quizapi/addquestion',question)
    }

}
