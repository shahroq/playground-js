import { app } from "./app";
import { config } from "./common/config";

export default {
  port: config.PORT,
  fetch: app.fetch,
};
