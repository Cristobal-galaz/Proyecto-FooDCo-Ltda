import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarordenComponent } from './mostrarorden.component';

describe('MostrarordenComponent', () => {
  let component: MostrarordenComponent;
  let fixture: ComponentFixture<MostrarordenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarordenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarordenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
