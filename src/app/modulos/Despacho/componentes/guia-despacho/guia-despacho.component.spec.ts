import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaDespachoComponent } from './guia-despacho.component';

describe('GuiaDespachoComponent', () => {
  let component: GuiaDespachoComponent;
  let fixture: ComponentFixture<GuiaDespachoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuiaDespachoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuiaDespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
