import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposProductoListComponent } from './tipos-producto-list.component';

describe('TiposProductoListComponent', () => {
  let component: TiposProductoListComponent;
  let fixture: ComponentFixture<TiposProductoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TiposProductoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposProductoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
