import { CategoriesState } from "../pages/categories/store/categories.state";
import { LoginState } from "../pages/login/store/login.state";
import { ProductDetailState } from "../pages/products/product-detail/store/products/product-detail.state";
import { ProductsState } from "../pages/products/store/products/products.state";
import { UserState } from "./user/user.state";

export type AppState = {
    categories: CategoriesState;
    login: LoginState;
    productDetail: ProductDetailState;
    products: ProductsState;
    user: UserState;
}