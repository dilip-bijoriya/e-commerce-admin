import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MockModule, MockProviders } from 'ng-mocks';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CustomModalService } from '../../../services/custom-modal/custom-modal.service';
import { MyRealmQuery } from '../../../store/realm/my-realm.query';
import { IconModule } from '../../icon/icon.module';
import { ModalConfirmCancelChangesComponent } from './modal-confirm-cancel-changes.component';

describe('ModalConfirmCancelChangesComponent', () => {
  let component: ModalConfirmCancelChangesComponent;
  let fixture: ComponentFixture<ModalConfirmCancelChangesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModalConfirmCancelChangesComponent],
        imports: [RouterTestingModule, MockModule(TranslateModule), MockModule(IconModule)],
        providers: [MockProviders(CustomModalService, MyRealmQuery, BsModalRef)],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmCancelChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
