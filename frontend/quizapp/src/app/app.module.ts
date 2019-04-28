import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestioncompComponent } from './questioncomp/questioncomp.component';
import {QuestionserviceService} from './service/questionservice.service';
import {FormsModule} from '@angular/forms';
import { AddquestionsComponent } from './addquestions/addquestions.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    QuestioncompComponent,
    AddquestionsComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule

  ],
  providers: [QuestionserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
