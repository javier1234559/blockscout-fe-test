import stripTrailingSlash from "lib/stripTrailingSlash";
import { getEnvValue, getEnvWithProductionFallback } from "./utils";

const apiHost = getEnvWithProductionFallback("NEXT_PUBLIC_API_HOST");
const apiSchema =
  getEnvWithProductionFallback("NEXT_PUBLIC_API_PROTOCOL") || "https";
const apiPort = getEnvWithProductionFallback("NEXT_PUBLIC_API_PORT"); // Không sử dụng port trong production

const apiEndpoint = [
  apiSchema || "https",
  "://",
  apiHost,
  apiPort && ":" + apiPort,
]
  .filter(Boolean)
  .join("");

const socketSchema =
  getEnvWithProductionFallback("NEXT_PUBLIC_API_WEBSOCKET_PROTOCOL") || "wss";
const socketEndpoint = [socketSchema, "://", apiHost, apiPort && ":" + apiPort]
  .filter(Boolean)
  .join("");

const api = Object.freeze({
  host: apiHost,
  protocol: apiSchema,
  port: apiPort,
  endpoint: apiEndpoint,
  socket: socketEndpoint,
  basePath: stripTrailingSlash(getEnvValue("NEXT_PUBLIC_API_BASE_PATH") || ""),
});

export default api;
