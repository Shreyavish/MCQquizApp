import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTypeSelectorComponent } from './question-type-selector.component';

describe('QuestionTypeSelectorComponent', () => {
  let component: QuestionTypeSelectorComponent;
  let fixture: ComponentFixture<QuestionTypeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionTypeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
