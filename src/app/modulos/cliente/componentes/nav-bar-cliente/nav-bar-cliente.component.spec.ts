import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarClienteComponent } from './nav-bar-cliente.component';

describe('NavBarClienteComponent', () => {
  let component: NavBarClienteComponent;
  let fixture: ComponentFixture<NavBarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
