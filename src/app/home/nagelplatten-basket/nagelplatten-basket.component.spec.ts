import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NagelplattenBasketComponent } from './nagelplatten-basket.component';

describe('NagelplattenBasketComponent', () => {
  let component: NagelplattenBasketComponent;
  let fixture: ComponentFixture<NagelplattenBasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NagelplattenBasketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NagelplattenBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
