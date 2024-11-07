import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDespachosComponent } from './tabla-despachos.component';

describe('TablaDespachosComponent', () => {
  let component: TablaDespachosComponent;
  let fixture: ComponentFixture<TablaDespachosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaDespachosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaDespachosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
