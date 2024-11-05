import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosEmpleadosListComponent } from './turnos-empleados-list.component';

describe('TurnosEmpleadosListComponent', () => {
  let component: TurnosEmpleadosListComponent;
  let fixture: ComponentFixture<TurnosEmpleadosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TurnosEmpleadosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnosEmpleadosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
