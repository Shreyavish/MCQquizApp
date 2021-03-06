import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  constructor() { }


  private iddata;  //data sharing for getting contest id of particular contest chosen by user
 private iddata2; //data sharing- for creating contest and getting its id and later updating the questions and leaderboard
 private qpaperid ;
 private username;
 private userresid;
 private cont_edit = false;
 private quespaper_edit = false;
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


  setusername(uname){
    this.username= uname;
  }
  getusername(){
    return this.username;
  }

  setqpaperid (qpaperid){
    this.qpaperid=qpaperid;
  }
  getqpaperid(){
    return this.qpaperid;
  }
  setuserresultid(id){
    this.userresid = id;

  }
  getuserresultid(){
    return this.userresid;
  }

  seteditcontest(isedited){
    this.cont_edit = isedited;

  }
  geteditcontest(){
    return this.cont_edit;
  }
  seteditquespaper(isedited){
    this.quespaper_edit = isedited;

  }
  geteditquespaper(){
    return this.quespaper_edit;

  }
}
