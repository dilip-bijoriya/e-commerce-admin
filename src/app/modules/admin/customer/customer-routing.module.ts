import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { AuthGuardGuard } from 'src/app/services/auth-guard/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'customer',
    pathMatch: 'full',
  },
  {
    path: 'customer',
    canActivate: [AuthGuardGuard],
    component: CustomersComponent
  },
  {
    path: 'add-customer',
    canActivate: [AuthGuardGuard],
    component: AddCustomerComponent
  },
  {
    path: 'add-customer/:customerId',
    canActivate: [AuthGuardGuard],
    component: AddCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
