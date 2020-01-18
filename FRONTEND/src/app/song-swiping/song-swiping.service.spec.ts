import { TestBed } from '@angular/core/testing';

import { SongSwipingService } from './song-swiping.service';

describe('SongSwipingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongSwipingService = TestBed.get(SongSwipingService);
    expect(service).toBeTruthy();
  });
});
