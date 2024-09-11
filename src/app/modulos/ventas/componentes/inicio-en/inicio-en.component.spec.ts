import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioEnComponent } from './inicio-en.component';

describe('InicioEnComponent', () => {
  let component: InicioEnComponent;
  let fixture: ComponentFixture<InicioEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioEnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
