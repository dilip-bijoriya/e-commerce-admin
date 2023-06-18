import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { ModalLogoutComponent } from './components/modal-logout/modal-logout.component';
import { CustomModalService } from '../services/custom-modal/custom-modal.service';
import { ModalConfirmCancelChangesComponent } from './components/modal-confirm/modal-confirm-cancel-changes/modal-confirm-cancel-changes.component';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ButtonComponent } from './components/button/button.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';



@NgModule({
  declarations: [
    SharedComponent,
    HeaderComponent,
    SidebarComponent,
    InputComponent,
    ModalConfirmComponent,
    ModalLogoutComponent,
    ModalConfirmCancelChangesComponent,
    PaginationComponent,
    ButtonComponent,
    FileUploadComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    CustomModalService,
    BsModalRef
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    InputComponent,
    ModalLogoutComponent,
    ModalConfirmComponent,
    PaginationComponent,
    ButtonComponent,
    FileUploadComponent,
    DropdownComponent
  ]
})
export class SharedModule { }
