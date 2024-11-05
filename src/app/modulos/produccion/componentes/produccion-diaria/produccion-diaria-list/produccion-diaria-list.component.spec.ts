import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionDiariaListComponent } from './produccion-diaria-list.component';

describe('ProduccionDiariaListComponent', () => {
  let component: ProduccionDiariaListComponent;
  let fixture: ComponentFixture<ProduccionDiariaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProduccionDiariaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduccionDiariaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
