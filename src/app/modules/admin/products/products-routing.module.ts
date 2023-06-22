import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AuthGuardGuard } from 'src/app/services/auth-guard/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full',
  },
  {
    path: 'product',
    canActivate: [AuthGuardGuard],
    component: ProductsComponent
  },
  {
    path: 'add-product',
    canActivate: [AuthGuardGuard],
    component: AddProductComponent
  },
  {
    path: 'add-product/:productId/:action',
    canActivate: [AuthGuardGuard],
    component: AddProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
