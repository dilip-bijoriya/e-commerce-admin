import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ModalInventryComponent } from './components/modal-inventry/modal-inventry.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
@NgModule({
  declarations: [
    DashboardComponent,
    InventoryComponent,
    ModalInventryComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule
  ]
})
export class DashboardModule { }
