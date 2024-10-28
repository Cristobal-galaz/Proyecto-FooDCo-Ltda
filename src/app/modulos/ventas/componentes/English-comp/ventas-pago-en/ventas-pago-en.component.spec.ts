import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasPagoEnComponent } from './ventas-pago-en.component';

describe('VentasPagoEnComponent', () => {
  let component: VentasPagoEnComponent;
  let fixture: ComponentFixture<VentasPagoEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasPagoEnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasPagoEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
