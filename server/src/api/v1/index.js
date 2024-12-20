import { Hono } from "hono";
import servicesRoute from "./services.route";

const apiV1 = new Hono().basePath("/v1");

apiV1.route("/", servicesRoute);

export default apiV1;
