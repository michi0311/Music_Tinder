import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongSwipingComponent } from './song-swiping.component';

describe('SongSwipingComponent', () => {
  let component: SongSwipingComponent;
  let fixture: ComponentFixture<SongSwipingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongSwipingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongSwipingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
