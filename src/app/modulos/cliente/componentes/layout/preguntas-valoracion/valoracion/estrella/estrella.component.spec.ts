import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstrellaComponent } from './estrella.component';

describe('EstrellaComponent', () => {
  let component: EstrellaComponent;
  let fixture: ComponentFixture<EstrellaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstrellaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstrellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
