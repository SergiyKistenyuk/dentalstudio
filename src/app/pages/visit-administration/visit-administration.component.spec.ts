import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitAdministrationComponent } from './visit-administration.component';

describe('VisitAdministrationComponent', () => {
  let component: VisitAdministrationComponent;
  let fixture: ComponentFixture<VisitAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
