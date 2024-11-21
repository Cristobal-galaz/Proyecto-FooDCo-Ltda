import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasValoracionComponent } from './preguntas-valoracion.component';

describe('PreguntasValoracionComponent', () => {
  let component: PreguntasValoracionComponent;
  let fixture: ComponentFixture<PreguntasValoracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreguntasValoracionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreguntasValoracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
