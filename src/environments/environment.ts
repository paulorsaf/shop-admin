import { environmentDefault } from "./environment.default";

export const environment = {
  ...environmentDefault,
  apiUrl: "http://localhost:3000",
  production: false
};