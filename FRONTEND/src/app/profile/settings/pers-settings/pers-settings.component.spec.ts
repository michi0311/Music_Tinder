import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersSettingsComponent } from './pers-settings.component';

describe('PersSettingsComponent', () => {
  let component: PersSettingsComponent;
  let fixture: ComponentFixture<PersSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
