// FIXME
// I was not able to figure out how to send CORS with credentials from localhost
// unsuccessfully tried different ways, even custom local dev domain
// so for local development we have to use next.js api as proxy server
export default function isNeedProxy() {
  // if (config.app.useProxy) {
  //   return true;
  // }
  return false;
  // return config.app.host === "localhost" && config.app.host !== config.api.host;
}
