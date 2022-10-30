import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BannerDetailEffects } from '../pages/banners/banner-detail/store/banner-detail.effects';
import { bannerDetailReducer } from '../pages/banners/banner-detail/store/banner-detail.reducers';
import { BannersEffects } from '../pages/banners/store/banners.effects';
import { bannersReducer } from '../pages/banners/store/banners.reducers';
import { CategoryDetailEffects } from '../pages/categories/category-detail/store/category-detail.effects';
import { categoryDetailReducer } from '../pages/categories/category-detail/store/category-detail.reducers';
import { CategoriesEffects } from '../pages/categories/store/categories.effects';
import { categoriesReducer } from '../pages/categories/store/categories.reducers';
import { CompanyDetailEffects } from '../pages/companies/company-detail/store/company-detail.effects';
import { companyDetailReducer } from '../pages/companies/company-detail/store/company-detail.reducers';
import { DailyPurchaseSummariesEffects } from '../pages/home/store/daily-purchase-summaries.effects';
import { dailyPurchaseSummariesReducer } from '../pages/home/store/daily-purchase-summaries.reducers';
import { LoginEffects } from '../pages/login/store/login.effects';
import { loginReducer } from '../pages/login/store/login.reducers';
import { ProductDetailEffects } from '../pages/products/product-detail/store/products/product-detail.effects';
import { productDetailReducer } from '../pages/products/product-detail/store/products/product-detail.reducers';
import { ProductsEffects } from '../pages/products/store/products/products.effects';
import { productsReducer } from '../pages/products/store/products/products.reducers';
import { PurchaseDetailEffects } from '../pages/purchases/purchase-detail/store/purchase-detail.effects';
import { purchaseDetailReducer } from '../pages/purchases/purchase-detail/store/purchase-detail.reducers';
import { PurchasesEffects } from '../pages/purchases/store/purchases.effects';
import { purchasesReducer } from '../pages/purchases/store/purchases.reducers';
import { clientsReducer } from '../pages/clients/store/clients.reducers';
import { UserEffects } from './user/user.effects';
import { userReducer } from './user/user.reducers';
import { ClientEffects } from '../pages/clients/store/clients.effects';
import { cupomsReducer } from '../pages/cupoms/store/cupoms.reducers';
import { CupomsEffects } from '../pages/cupoms/store/cupoms.effects';
import { updateStockReducer } from './stock/update-stock.reducers';
import { UpdateStockEffects } from './stock/update-stock.effects';

@NgModule({
  imports: [
    StoreModule.forRoot([]),
    StoreModule.forFeature('bannerDetail', bannerDetailReducer),
    StoreModule.forFeature('banners', bannersReducer),
    StoreModule.forFeature('categories', categoriesReducer),
    StoreModule.forFeature('categoryDetail', categoryDetailReducer),
    StoreModule.forFeature('clients', clientsReducer),
    StoreModule.forFeature('companyDetail', companyDetailReducer),
    StoreModule.forFeature('cupoms', cupomsReducer),
    StoreModule.forFeature('dailyPurchaseSummaries', dailyPurchaseSummariesReducer),
    StoreModule.forFeature('login', loginReducer),
    StoreModule.forFeature('productDetail', productDetailReducer),
    StoreModule.forFeature('products', productsReducer),
    StoreModule.forFeature('purchaseDetail', purchaseDetailReducer),
    StoreModule.forFeature('purchases', purchasesReducer),
    StoreModule.forFeature('updateStock', updateStockReducer),
    StoreModule.forFeature('user', userReducer),
    StoreDevtoolsModule.instrument({maxAge: 25}),

    EffectsModule.forRoot([
      BannerDetailEffects,
      BannersEffects,
      CategoriesEffects,
      CategoryDetailEffects,
      ClientEffects,
      CompanyDetailEffects,
      CupomsEffects,
      DailyPurchaseSummariesEffects,
      LoginEffects,
      ProductDetailEffects,
      ProductsEffects,
      PurchaseDetailEffects,
      PurchasesEffects,
      UpdateStockEffects,
      UserEffects
    ])
  ]
})
export class AppStoreModule { }
