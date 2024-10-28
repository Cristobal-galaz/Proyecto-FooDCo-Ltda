import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionInventarioComponent } from './revision-inventario.component';

describe('RevisionInventarioComponent', () => {
  let component: RevisionInventarioComponent;
  let fixture: ComponentFixture<RevisionInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RevisionInventarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisionInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
