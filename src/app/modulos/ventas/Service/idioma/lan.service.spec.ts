import { TestBed } from '@angular/core/testing';

import { LanService } from './lan.service';

describe('LanService', () => {
  let service: LanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
