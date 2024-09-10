import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDeCompraComponent } from './orden-de-compra.component';

describe('OrdenDeCompraComponent', () => {
  let component: OrdenDeCompraComponent;
  let fixture: ComponentFixture<OrdenDeCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenDeCompraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenDeCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
