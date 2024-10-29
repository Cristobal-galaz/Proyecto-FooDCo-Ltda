import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasPrimasFormComponent } from './materias-primas-form.component';

describe('MateriasPrimasFormComponent', () => {
  let component: MateriasPrimasFormComponent;
  let fixture: ComponentFixture<MateriasPrimasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MateriasPrimasFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriasPrimasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
