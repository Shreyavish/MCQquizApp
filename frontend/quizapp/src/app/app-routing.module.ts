import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddquestionsComponent} from './addquestions/addquestions.component';
import { QuestioncompComponent } from './questioncomp/questioncomp.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { GetcontestsComponent } from './getcontests/getcontests.component';
import {CreateContestComponent} from './create-contest/create-contest.component';
import { QuestionTypeSelectorComponent } from './question-type-selector/question-type-selector.component';
import { GetExistingQuestionsComponent } from './get-existing-questions/get-existing-questions.component';
import { EditContestComponent } from './edit-contest/edit-contest.component';
import { PlayQuizComponent } from './play-quiz/play-quiz.component';
import { PlayQuizTypeTwoComponent } from './play-quiz-type-two/play-quiz-type-two.component';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { QuestionPaperComponent } from './question-paper/question-paper.component';
import { AddQuestionPaperToContestComponent } from './add-question-paper-to-contest/add-question-paper-to-contest.component';
const routes: Routes = [

    {path: 'addquestions' , component: AddquestionsComponent },
  //{path: 'questioncomp' , component:  QuestioncompComponent },
  {path: 'leaderboard' , component: LeaderboardComponent},
  {path: 'getcontest',component:GetcontestsComponent},
  {path:'createcontest',component:CreateContestComponent},
  {path:'qtypeselector',component:QuestionTypeSelectorComponent},
  {path:'getexistquestions',component:GetExistingQuestionsComponent},
  {path:'editcontest',component:EditContestComponent},
  {path: 'playquiz' , component:  PlayQuizComponent },
  {path: 'playquiz2' , component:PlayQuizTypeTwoComponent},
  {path: 'userlanding' , component:UserLandingComponent},
  {path: 'questionpaper' , component:QuestionPaperComponent},
  {path:'showquestionpapers',component:AddQuestionPaperToContestComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
