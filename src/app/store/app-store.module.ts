import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BannersEffects } from '../pages/banners/store/banners.effects';
import { bannersReducer } from '../pages/banners/store/banners.reducers';
import { CategoryDetailEffects } from '../pages/categories/category-detail/store/category-detail.effects';
import { categoryDetailReducer } from '../pages/categories/category-detail/store/category-detail.reducers';
import { CategoriesEffects } from '../pages/categories/store/categories.effects';
import { categoriesReducer } from '../pages/categories/store/categories.reducers';
import { LoginEffects } from '../pages/login/store/login.effects';
import { loginReducer } from '../pages/login/store/login.reducers';
import { ProductDetailEffects } from '../pages/products/product-detail/store/products/product-detail.effects';
import { productDetailReducer } from '../pages/products/product-detail/store/products/product-detail.reducers';
import { ProductsEffects } from '../pages/products/store/products/products.effects';
import { productsReducer } from '../pages/products/store/products/products.reducers';
import { UserEffects } from './user/user.effects';
import { userReducer } from './user/user.reducers';

@NgModule({
  imports: [
    StoreModule.forRoot([]),
    StoreModule.forFeature('banners', bannersReducer),
    StoreModule.forFeature('categories', categoriesReducer),
    StoreModule.forFeature('categoryDetail', categoryDetailReducer),
    StoreModule.forFeature('login', loginReducer),
    StoreModule.forFeature('productDetail', productDetailReducer),
    StoreModule.forFeature('products', productsReducer),
    StoreModule.forFeature('user', userReducer),
    StoreDevtoolsModule.instrument({maxAge: 25}),

    EffectsModule.forRoot([
      BannersEffects,
      CategoriesEffects,
      CategoryDetailEffects,
      LoginEffects,
      ProductDetailEffects,
      ProductsEffects,
      UserEffects
    ])
  ]
})
export class AppStoreModule { }
