import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalForgetPasswordComponent } from './modal-forget-password.component';

describe('ModalForgetPasswordComponent', () => {
  let component: ModalForgetPasswordComponent;
  let fixture: ComponentFixture<ModalForgetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalForgetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
