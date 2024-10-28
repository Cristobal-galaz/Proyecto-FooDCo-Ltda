import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionDespachoComponent } from './asignacion-despacho.component';

describe('AsignacionDespachoComponent', () => {
  let component: AsignacionDespachoComponent;
  let fixture: ComponentFixture<AsignacionDespachoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionDespachoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionDespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
