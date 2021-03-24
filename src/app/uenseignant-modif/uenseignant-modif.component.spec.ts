import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UEnseignantModifComponent } from './uenseignant-modif.component';

describe('UEnseignantModifComponent', () => {
  let component: UEnseignantModifComponent;
  let fixture: ComponentFixture<UEnseignantModifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UEnseignantModifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UEnseignantModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
