import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalwebsComponent } from './metalwebs.component';

describe('MetalwebsComponent', () => {
  let component: MetalwebsComponent;
  let fixture: ComponentFixture<MetalwebsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetalwebsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalwebsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
