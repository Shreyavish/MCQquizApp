import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayQuizTypeTwoComponent } from './play-quiz-type-two.component';

describe('PlayQuizTypeTwoComponent', () => {
  let component: PlayQuizTypeTwoComponent;
  let fixture: ComponentFixture<PlayQuizTypeTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayQuizTypeTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayQuizTypeTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
