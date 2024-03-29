import { BannerDetailState } from "../pages/banners/banner-detail/store/banner-detail.state";
import { BannersState } from "../pages/banners/store/banners.state";
import { CategoryDetailState } from "../pages/categories/category-detail/store/category-detail.state";
import { CategoriesState } from "../pages/categories/store/categories.state";
import { CompanyDetailState } from "../pages/companies/company-detail/store/company-detail.state";
import { DailyPurchaseSummariesState } from "../pages/home/store/daily-purchase-summaries.state";
import { LoginState } from "../pages/login/store/login.state";
import { ProductDetailState } from "../pages/products/product-detail/store/products/product-detail.state";
import { ProductsState } from "../pages/products/store/products/products.state";
import { PurchaseDetailState } from "../pages/purchases/purchase-detail/store/purchase-detail.state";
import { PurchasesState } from "../pages/purchases/store/purchases.state";
import { ClientsState } from "../pages/clients/store/clients.state";
import { UserState } from "./user/user.state";
import { CupomsState } from "../pages/cupoms/store/cupoms.state";
import { UpdateStockState } from "./stock/update-stock.state";

export type AppState = {
    bannerDetail: BannerDetailState;
    banners: BannersState;
    categories: CategoriesState;
    categoryDetail: CategoryDetailState;
    clients: ClientsState;
    companyDetail: CompanyDetailState;
    cupoms: CupomsState;
    dailyPurchaseSummaries: DailyPurchaseSummariesState;
    login: LoginState;
    productDetail: ProductDetailState;
    products: ProductsState;
    purchaseDetail: PurchaseDetailState;
    purchases: PurchasesState;
    updateStock: UpdateStockState;
    user: UserState;
}