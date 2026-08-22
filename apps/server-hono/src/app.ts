import { Hono } from "hono";
import { products } from "./features/products";
import { globalErrorHandler } from "./common/error/global-error-handler.middleware";

const app = new Hono();
const apiv1 = new Hono();

app.get("/", (c) => c.text("Hello Hono!"));

apiv1.route("/products", products);

app.route("/api/v1", apiv1);

app.onError(globalErrorHandler);

export { app };
