import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginClientesComponent } from './login-clientes.component';

describe('LoginClientesComponent', () => {
  let component: LoginClientesComponent;
  let fixture: ComponentFixture<LoginClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginClientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
