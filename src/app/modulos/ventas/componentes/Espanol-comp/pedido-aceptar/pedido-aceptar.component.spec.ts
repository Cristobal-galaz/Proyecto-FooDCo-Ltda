import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoAceptarComponent } from './pedido-aceptar.component';

describe('PedidoAceptarComponent', () => {
  let component: PedidoAceptarComponent;
  let fixture: ComponentFixture<PedidoAceptarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoAceptarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoAceptarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
