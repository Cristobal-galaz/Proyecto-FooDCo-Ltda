import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionDiariaFormComponent } from './produccion-diaria-form.component';

describe('ProduccionDiariaFormComponent', () => {
  let component: ProduccionDiariaFormComponent;
  let fixture: ComponentFixture<ProduccionDiariaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProduccionDiariaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduccionDiariaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
