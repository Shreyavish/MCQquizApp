import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddquestionsComponent} from './addquestions/addquestions.component';
import { QuestioncompComponent } from './questioncomp/questioncomp.component';

const routes: Routes = [

    {path: 'addquestions' , component: AddquestionsComponent },
  {path: 'questioncomp' , component:  QuestioncompComponent },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
