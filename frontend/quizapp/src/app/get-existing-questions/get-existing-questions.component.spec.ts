import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetExistingQuestionsComponent } from './get-existing-questions.component';

describe('GetExistingQuestionsComponent', () => {
  let component: GetExistingQuestionsComponent;
  let fixture: ComponentFixture<GetExistingQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetExistingQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetExistingQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
