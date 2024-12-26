import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger as loggerMiddleware } from "hono/logger";
import api from "./api";
import { connectDatabase } from "./lib/mongoose";
import logger from "./utils/logger";

const app = new Hono();

// Database
connectDatabase()

// Start Middlewares
app.use("*", loggerMiddleware());
app.use("*", cors());

app.route("/", api);

// End Middlewares
app.notFound((c) => {
  return c.text("Custom 404 Message", 404);
});

app.onError((err, c) => {
  logger.error(err);
  return c.text("Custom Error Message", 500);
});

const port = 3000;

logger.info(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
