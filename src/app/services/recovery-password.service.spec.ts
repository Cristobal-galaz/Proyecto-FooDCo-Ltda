import { TestBed } from '@angular/core/testing';

import { RecoveryPasswordService } from './recovery-password.service';

describe('RecoveryPasswordService', () => {
  let service: RecoveryPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoveryPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
