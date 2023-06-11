import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInventryComponent } from './modal-inventry.component';

describe('ModalInventryComponent', () => {
  let component: ModalInventryComponent;
  let fixture: ComponentFixture<ModalInventryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInventryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInventryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
