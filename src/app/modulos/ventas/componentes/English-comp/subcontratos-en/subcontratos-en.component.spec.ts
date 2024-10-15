import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontratosEnComponent } from './subcontratos-en.component';

describe('SubcontratosEnComponent', () => {
  let component: SubcontratosEnComponent;
  let fixture: ComponentFixture<SubcontratosEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcontratosEnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcontratosEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
