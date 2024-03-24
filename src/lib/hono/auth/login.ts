import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { setSignedCookie } from "hono/cookie";

import { LoginRequestBodySchema } from "@/lib/schema/api/auth/LoginRequestBody";
import { LoginResponseSchema } from "@/lib/schema/api/auth/LoginResponse";

import { COOKIE_SECRET_KEY } from "@/lib/constants/cookieSecretKey";
import { userRepository } from "@/lib/repositories";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7日間有効

const app = new OpenAPIHono();

const route = createRoute({
  method: "post",
  path: "/v1/admin/login",
  request: {
    body: {
      content: {
        "application/json": {
          schema: LoginRequestBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: LoginResponseSchema,
        },
      },
      description: "Login.",
    },
  },
  tags: ["[Admin] Auth API"],
});

app.openapi(route, async (c) => {
  const body = c.req.valid("json");

  const result = await userRepository.login({ body });

  if (result.isErr()) {
    throw result.error;
  }

  await setSignedCookie(c, "userId", result.value.id, COOKIE_SECRET_KEY, {
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
    sameSite: "Lax",
    secure: true,
  });

  return c.json(result.value);
});

export { app as loginApp };
