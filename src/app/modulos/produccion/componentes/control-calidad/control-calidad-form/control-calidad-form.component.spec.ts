import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCalidadFormComponent } from './control-calidad-form.component';

describe('ControlCalidadFormComponent', () => {
  let component: ControlCalidadFormComponent;
  let fixture: ComponentFixture<ControlCalidadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlCalidadFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlCalidadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
