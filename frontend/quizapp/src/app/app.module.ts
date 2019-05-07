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
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { GetcontestsComponent } from './getcontests/getcontests.component';
import { CalendarModule } from 'primeng/calendar';
import { CreateContestComponent } from './create-contest/create-contest.component';
import { QuestionTypeSelectorComponent } from './question-type-selector/question-type-selector.component';
import { GetExistingQuestionsComponent } from './get-existing-questions/get-existing-questions.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { EditContestComponent } from './edit-contest/edit-contest.component';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [
    AppComponent,
    QuestioncompComponent,
    AddquestionsComponent,
    HomepageComponent,
    LeaderboardComponent,
    GetcontestsComponent,
    CreateContestComponent,
    QuestionTypeSelectorComponent,
    GetExistingQuestionsComponent,
    EditContestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    CalendarModule,
    NgxPaginationModule,
    NgxEditorModule,
  ],
  providers: [QuestionserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
