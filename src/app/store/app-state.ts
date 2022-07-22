import { BannersState } from "../pages/banners/store/banners.state";
import { CategoryDetailState } from "../pages/categories/category-detail/store/category-detail.state";
import { CategoriesState } from "../pages/categories/store/categories.state";
import { LoginState } from "../pages/login/store/login.state";
import { ProductDetailState } from "../pages/products/product-detail/store/products/product-detail.state";
import { ProductsState } from "../pages/products/store/products/products.state";
import { UserState } from "./user/user.state";

export type AppState = {
    banners: BannersState;
    categories: CategoriesState;
    categoryDetail: CategoryDetailState;
    login: LoginState;
    productDetail: ProductDetailState;
    products: ProductsState;
    user: UserState;
}