import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjeInicioEnComponent } from './eje-inicio-en.component';

describe('EjeInicioEnComponent', () => {
  let component: EjeInicioEnComponent;
  let fixture: ComponentFixture<EjeInicioEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjeInicioEnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjeInicioEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
