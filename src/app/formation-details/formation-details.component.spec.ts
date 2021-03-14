import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationDetailsComponent } from './formation-details.component';

describe('FormationDetailsComponent', () => {
  let component: FormationDetailsComponent;
  let fixture: ComponentFixture<FormationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
