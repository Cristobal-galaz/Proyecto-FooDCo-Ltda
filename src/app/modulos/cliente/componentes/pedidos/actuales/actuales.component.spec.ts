import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualesComponent } from './actuales.component';

describe('ActualesComponent', () => {
  let component: ActualesComponent;
  let fixture: ComponentFixture<ActualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
