import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenCompraComponent } from './orden-compra.component';

describe('OrdenCompraComponent', () => {
  let component: OrdenCompraComponent;
  let fixture: ComponentFixture<OrdenCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenCompraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
