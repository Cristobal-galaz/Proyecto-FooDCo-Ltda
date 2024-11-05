import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDespachoComponent } from './navbar-despacho.component';

describe('NavbarDespachoComponent', () => {
  let component: NavbarDespachoComponent;
  let fixture: ComponentFixture<NavbarDespachoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarDespachoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarDespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
