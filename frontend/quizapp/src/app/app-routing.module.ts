import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddquestionsComponent} from './addquestions/addquestions.component';
import { QuestioncompComponent } from './questioncomp/questioncomp.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { GetcontestsComponent } from './getcontests/getcontests.component';
import {CreateContestComponent} from './create-contest/create-contest.component';
import { QuestionTypeSelectorComponent } from './question-type-selector/question-type-selector.component';
import { GetExistingQuestionsComponent } from './get-existing-questions/get-existing-questions.component';
const routes: Routes = [

    {path: 'addquestions' , component: AddquestionsComponent },
  {path: 'questioncomp' , component:  QuestioncompComponent },
  {path: 'leaderboard' , component: LeaderboardComponent},
  {path: 'getcontest',component:GetcontestsComponent},
  {path:'createcontest',component:CreateContestComponent},
  {path:'qtypeselector',component:QuestionTypeSelectorComponent},
  {path:'getexistquestions',component:GetExistingQuestionsComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
