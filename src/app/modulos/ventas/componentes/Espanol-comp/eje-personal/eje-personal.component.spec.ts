import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjePersonalComponent } from './eje-personal.component';

describe('EjePersonalComponent', () => {
  let component: EjePersonalComponent;
  let fixture: ComponentFixture<EjePersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjePersonalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
