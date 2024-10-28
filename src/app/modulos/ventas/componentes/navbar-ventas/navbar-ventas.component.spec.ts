import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarVentasComponent } from './navbar-ventas.component';

describe('NavbarVentasComponent', () => {
  let component: NavbarVentasComponent;
  let fixture: ComponentFixture<NavbarVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarVentasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
