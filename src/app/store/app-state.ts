import { LoginState } from "../pages/login/store/login.state";
import { UserState } from "./user/user.state";

export type AppState = {
    login: LoginState;
    user: UserState;
}