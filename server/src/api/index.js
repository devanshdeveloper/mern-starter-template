import { Hono } from "hono";
import apiV1 from "./v1";

const api = new Hono().basePath("/api");

api.route("/", apiV1);

export default api;
