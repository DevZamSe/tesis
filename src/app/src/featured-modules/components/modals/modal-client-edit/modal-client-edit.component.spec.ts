import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalClientEditComponent } from './modal-client-edit.component';

describe('ModalClientEditComponent', () => {
  let component: ModalClientEditComponent;
  let fixture: ComponentFixture<ModalClientEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalClientEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalClientEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
