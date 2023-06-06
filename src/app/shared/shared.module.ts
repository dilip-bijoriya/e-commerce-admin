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


@NgModule({
  declarations: [
    SharedComponent,
    HeaderComponent,
    SidebarComponent,
    InputComponent,
    ModalConfirmComponent,
    ModalLogoutComponent,
    ModalConfirmCancelChangesComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    // FormsModule,
    // ReactiveFormsModule
  ],
  providers: [
    CustomModalService
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    InputComponent,
    ModalLogoutComponent,
    ModalConfirmComponent
  ]
})
export class SharedModule { }
