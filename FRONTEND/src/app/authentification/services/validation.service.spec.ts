import {TestBed} from '@angular/core/testing';

import {PasswordValidationService} from './passwordValidation.service';

describe('ValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordValidationService = TestBed.get(PasswordValidationService);
    expect(service).toBeTruthy();
  });
});
