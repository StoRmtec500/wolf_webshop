import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NagelplattenComponent } from './nagelplatten.component';

describe('NagelplattenComponent', () => {
  let component: NagelplattenComponent;
  let fixture: ComponentFixture<NagelplattenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NagelplattenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NagelplattenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
