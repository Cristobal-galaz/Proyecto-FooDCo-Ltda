import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasPrimasListComponent } from './materias-primas-list.component';

describe('MateriasPrimasListComponent', () => {
  let component: MateriasPrimasListComponent;
  let fixture: ComponentFixture<MateriasPrimasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MateriasPrimasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriasPrimasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
