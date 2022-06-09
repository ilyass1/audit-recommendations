import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionInterneComponent } from './mission-interne.component';

describe('MissionInterneComponent', () => {
  let component: MissionInterneComponent;
  let fixture: ComponentFixture<MissionInterneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionInterneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionInterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
