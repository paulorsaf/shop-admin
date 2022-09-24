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
  }, {
    path: "banners",
    loadChildren: () => import('./pages/banners/banners.module').then((m) => m.BannersModule),
  }, {
    path: "purchases",
    loadChildren: () => import('./pages/purchases/purchases.module').then((m) => m.PurchasesModule),
  }, {
    path: "companies",
    loadChildren: () => import('./pages/companies/companies.module').then((m) => m.CompaniesModule),
  }, {
    path: "users",
    loadChildren: () => import('./pages/clients/clients.module').then((m) => m.UsersModule),
  }, {
    path: "cupoms",
    loadChildren: () => import('./pages/cupoms/cupoms.module').then((m) => m.CupomsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
