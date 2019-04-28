import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestioncompComponent } from './questioncomp.component';

describe('QuestioncompComponent', () => {
  let component: QuestioncompComponent;
  let fixture: ComponentFixture<QuestioncompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestioncompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestioncompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
