import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionComponent } from './verificacion.component';

describe('VerificacionComponent', () => {
  let component: VerificacionComponent;
  let fixture: ComponentFixture<VerificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
