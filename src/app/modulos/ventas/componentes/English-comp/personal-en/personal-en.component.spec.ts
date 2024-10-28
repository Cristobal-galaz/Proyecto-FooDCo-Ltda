import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalEnComponent } from './personal-en.component';

describe('PersonalEnComponent', () => {
  let component: PersonalEnComponent;
  let fixture: ComponentFixture<PersonalEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalEnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
