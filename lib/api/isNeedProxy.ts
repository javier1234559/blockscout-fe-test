// FIXME
// I was not able to figure out how to send CORS with credentials from localhost
// unsuccessfully tried different ways, even custom local dev domain

import config from "configs/app";

// so for local development we have to use next.js api as proxy server
export default function isNeedProxy() {
  return config.app.useProxy;
  // return config.app.host === "localhost" && config.app.host !== config.api.host;
}
