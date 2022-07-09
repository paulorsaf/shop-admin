import { LoginState } from "../pages/login/store/login.state";
import { ProductsState } from "../pages/products/store/products.state";
import { UserState } from "./user/user.state";

export type AppState = {
    login: LoginState;
    products: ProductsState;
    user: UserState;
}