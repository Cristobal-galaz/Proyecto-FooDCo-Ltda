import { TestBed } from '@angular/core/testing';

import { ExternService } from './extern.service';

describe('ExternService', () => {
  let service: ExternService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
