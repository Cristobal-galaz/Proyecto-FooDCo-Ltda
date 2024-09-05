import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosEmpleadosFormComponent } from './turnos-empleados-form.component';

describe('TurnosEmpleadosFormComponent', () => {
  let component: TurnosEmpleadosFormComponent;
  let fixture: ComponentFixture<TurnosEmpleadosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TurnosEmpleadosFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnosEmpleadosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
