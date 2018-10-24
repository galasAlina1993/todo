import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrlsComponent } from './ctrls.component';

describe('CtrlsComponent', () => {
  let component: CtrlsComponent;
  let fixture: ComponentFixture<CtrlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtrlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
