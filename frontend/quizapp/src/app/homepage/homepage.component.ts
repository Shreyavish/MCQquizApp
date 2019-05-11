import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import {CountdownTimerModule} from 'ngx-countdown-timer';
import {timer} from 'rxjs';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {


  }
  create(){
    this.router.navigate(['/addquestions']);
  }
  play(){

    this.router.navigate(['/questioncomp']);
  }






    }


