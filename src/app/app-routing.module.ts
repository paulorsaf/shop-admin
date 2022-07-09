import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "login",
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule),
  }, {
    path: "home",
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
  }, {
    path: "products",
    loadChildren: () => import('./pages/products/products.module').then((m) => m.ProductsModule),
  }, {
    path: "categories",
    loadChildren: () => import('./pages/categories/categories.module').then((m) => m.CategoriesModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
