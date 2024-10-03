import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjeInicioComponent } from './eje-inicio.component';

describe('EjeInicioComponent', () => {
  let component: EjeInicioComponent;
  let fixture: ComponentFixture<EjeInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjeInicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjeInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
