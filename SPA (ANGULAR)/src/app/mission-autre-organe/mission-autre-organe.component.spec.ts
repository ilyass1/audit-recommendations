import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionAutreOrganeComponent } from './mission-autre-organe.component';

describe('MissionAutreOrganeComponent', () => {
  let component: MissionAutreOrganeComponent;
  let fixture: ComponentFixture<MissionAutreOrganeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionAutreOrganeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionAutreOrganeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
