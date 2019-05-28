import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionPaperToContestComponent } from './add-question-paper-to-contest.component';

describe('AddQuestionPaperToContestComponent', () => {
  let component: AddQuestionPaperToContestComponent;
  let fixture: ComponentFixture<AddQuestionPaperToContestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuestionPaperToContestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionPaperToContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
