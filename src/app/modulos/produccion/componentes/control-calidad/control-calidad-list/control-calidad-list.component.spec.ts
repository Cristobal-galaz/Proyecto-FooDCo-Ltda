import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCalidadListComponent } from './control-calidad-list.component';

describe('ControlCalidadListComponent', () => {
  let component: ControlCalidadListComponent;
  let fixture: ComponentFixture<ControlCalidadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlCalidadListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlCalidadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
