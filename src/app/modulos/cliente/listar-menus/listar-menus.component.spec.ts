import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMenusComponent } from './listar-menus.component';

describe('ListarMenusComponent', () => {
  let component: ListarMenusComponent;
  let fixture: ComponentFixture<ListarMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarMenusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
