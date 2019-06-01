import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetQpapersComponent } from './get-qpapers.component';

describe('GetQpapersComponent', () => {
  let component: GetQpapersComponent;
  let fixture: ComponentFixture<GetQpapersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetQpapersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetQpapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
