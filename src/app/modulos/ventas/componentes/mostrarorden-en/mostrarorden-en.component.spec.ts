import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarordenEnComponent } from './mostrarorden-en.component';

describe('MostrarordenEnComponent', () => {
  let component: MostrarordenEnComponent;
  let fixture: ComponentFixture<MostrarordenEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarordenEnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarordenEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
