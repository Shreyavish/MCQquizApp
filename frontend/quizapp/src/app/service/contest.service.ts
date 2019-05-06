import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  constructor() { }


  private iddata;  //data sharing for getting contest id of particular contest chosen by user
 private iddata2; //data sharing for creating contest and getting its id and later updating the questions and leaderboard
  setdata (iddata){
    this.iddata=iddata;
  }
  getdata(){
    return this.iddata;
  }

  setdata2(iddata2){
    this.iddata2=iddata2;
  }
  getdata2(){
    return this.iddata2;
  }
}
