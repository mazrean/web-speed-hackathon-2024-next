import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { secureHeaders } from "hono/secure-headers";

import { cacheControlMiddleware } from "@/lib/hono/middlewares/cacheControlMiddleware";
import { compressMiddleware } from "@/lib/hono/middlewares/compressMiddleware";

import { apiApp } from "@/lib/hono";

const app = new Hono().basePath("/api");

app.use(secureHeaders());
app.use(
  cors({
    allowHeaders: [
      "Content-Type",
      "Accept-Encoding",
      "X-Accept-Encoding",
      "Authorization",
    ],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
    exposeHeaders: ["Content-Encoding", "X-Content-Encoding"],
    origin: (origin) => origin,
  })
);
app.use(compressMiddleware);
app.use(cacheControlMiddleware);

app.route("/", apiApp);

app.onError((cause) => {
  console.error(cause);

  if (cause instanceof HTTPException) {
    return cause.getResponse();
  }

  const err = new HTTPException(500, {
    cause: cause,
    message: "Internal server error.",
  });
  return err.getResponse();
});

export { app };
