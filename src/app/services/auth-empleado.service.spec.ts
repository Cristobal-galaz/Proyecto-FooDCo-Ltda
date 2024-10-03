import { TestBed } from '@angular/core/testing';

import { AuthEmpleadoService } from './auth-empleado.service';

describe('AuthEmpleadoService', () => {
  let service: AuthEmpleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthEmpleadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
