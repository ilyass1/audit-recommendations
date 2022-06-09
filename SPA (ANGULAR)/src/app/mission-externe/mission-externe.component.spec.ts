import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionExterneComponent } from './mission-externe.component';

describe('MissionExterneComponent', () => {
  let component: MissionExterneComponent;
  let fixture: ComponentFixture<MissionExterneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionExterneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionExterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
