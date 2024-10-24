import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosContactoComponent } from './datos-contacto.component';

describe('DatosContactoComponent', () => {
  let component: DatosContactoComponent;
  let fixture: ComponentFixture<DatosContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosContactoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
