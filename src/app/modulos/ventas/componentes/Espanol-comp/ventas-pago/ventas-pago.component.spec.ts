import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasPagoComponent } from './ventas-pago.component';

describe('VentasPagoComponent', () => {
  let component: VentasPagoComponent;
  let fixture: ComponentFixture<VentasPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasPagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
