import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SharedComponent,
    HeaderComponent,
    SidebarComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    // FormsModule,
    // ReactiveFormsModule
  ],
  exports: [HeaderComponent, SidebarComponent, InputComponent]
})
export class SharedModule { }
