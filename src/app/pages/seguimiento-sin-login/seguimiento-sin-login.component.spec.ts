import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoSinLoginComponent } from './seguimiento-sin-login.component';

describe('SeguimientoSinLoginComponent', () => {
  let component: SeguimientoSinLoginComponent;
  let fixture: ComponentFixture<SeguimientoSinLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguimientoSinLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguimientoSinLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
