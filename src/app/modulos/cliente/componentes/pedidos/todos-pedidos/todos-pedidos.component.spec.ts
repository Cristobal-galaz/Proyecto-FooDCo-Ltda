import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosPedidosComponent } from './todos-pedidos.component';

describe('TodosPedidosComponent', () => {
  let component: TodosPedidosComponent;
  let fixture: ComponentFixture<TodosPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
