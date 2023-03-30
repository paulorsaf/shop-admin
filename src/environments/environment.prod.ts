import { environmentDefault } from "./environment.default";

export const environment = {
  ...environmentDefault,
  apiUrl: "https://southamerica-east1-shop-354211.cloudfunctions.net/shop-admin-server",
  production: true
};
