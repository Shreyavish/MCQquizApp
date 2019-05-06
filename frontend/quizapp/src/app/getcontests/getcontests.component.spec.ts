import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcontestsComponent } from './getcontests.component';

describe('GetcontestsComponent', () => {
  let component: GetcontestsComponent;
  let fixture: ComponentFixture<GetcontestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetcontestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetcontestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
