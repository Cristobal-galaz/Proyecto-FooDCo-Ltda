import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenCompraEnComponent } from './orden-compra-en.component';

describe('OrdenCompraEnComponent', () => {
  let component: OrdenCompraEnComponent;
  let fixture: ComponentFixture<OrdenCompraEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenCompraEnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenCompraEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
