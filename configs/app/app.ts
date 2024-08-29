import { getEnvValue, getEnvWithProductionFallback } from "configs/app/utils";

const appPort = getEnvWithProductionFallback("NEXT_PUBLIC_APP_PORT");
const appSchema = getEnvWithProductionFallback("NEXT_PUBLIC_APP_PROTOCOL");
const appHost = getEnvWithProductionFallback("NEXT_PUBLIC_APP_HOST");
const baseUrl = [appSchema || "https", "://", appHost, appPort && ":" + appPort]
  .filter(Boolean)
  .join("");
const isDev =
  getEnvWithProductionFallback("NEXT_PUBLIC_APP_ENV") === "development";

const app = Object.freeze({
  isDev,
  protocol: appSchema,
  host: appHost,
  port: appPort,
  baseUrl,
  // useProxy: getEnvValue("NEXT_PUBLIC_USE_NEXT_JS_PROXY") === "true",
  useProxy: false,
});

export default app;
