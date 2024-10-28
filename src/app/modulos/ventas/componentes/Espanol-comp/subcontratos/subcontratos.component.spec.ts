import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontratosComponent } from './subcontratos.component';

describe('SubcontratosComponent', () => {
  let component: SubcontratosComponent;
  let fixture: ComponentFixture<SubcontratosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcontratosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcontratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
