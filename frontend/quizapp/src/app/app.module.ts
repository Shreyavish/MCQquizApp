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
import { PlayQuizComponent } from './play-quiz/play-quiz.component';
import { CountdownModule } from 'ngx-countdown';
import { CountdownTimerModule } from 'ngx-countdown-timer';
import { PlayQuizTypeTwoComponent } from './play-quiz-type-two/play-quiz-type-two.component';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { QuestionPaperComponent } from './question-paper/question-paper.component';

import { NgxTagsInputModule } from 'ngx-tags-input';
import { AddQuestionPaperToContestComponent } from './add-question-paper-to-contest/add-question-paper-to-contest.component';
import { GetQpapersComponent } from './get-qpapers/get-qpapers.component';
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
    EditContestComponent,
    PlayQuizComponent,
    PlayQuizTypeTwoComponent,
    UserLandingComponent,
    QuestionPaperComponent,
    AddQuestionPaperToContestComponent,
    GetQpapersComponent,

  ],
  imports: [
    NgxTagsInputModule,

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    CalendarModule,
    NgxPaginationModule,
    NgxEditorModule,
    CountdownModule,
    CountdownTimerModule
  ],
  providers: [QuestionserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
