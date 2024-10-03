import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjePersonalEnComponent } from './eje-personal-en.component';

describe('EjePersonalEnComponent', () => {
  let component: EjePersonalEnComponent;
  let fixture: ComponentFixture<EjePersonalEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjePersonalEnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjePersonalEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
