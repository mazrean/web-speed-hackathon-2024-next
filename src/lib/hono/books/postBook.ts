import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import { PostBookRequestBodySchema } from "@/lib/schema/api/books/PostBookRequestBody";
import { PostBookResponseSchema } from "@/lib/schema/api/books/PostBookResponse";

import { authMiddleware } from "@/lib/hono/middlewares/authMiddleware";
import { bookRepository } from "@/lib/repositories";

const app = new OpenAPIHono();

const route = createRoute({
  method: "post",
  path: "/v1/books",
  request: {
    body: {
      content: {
        "application/json": {
          schema: PostBookRequestBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: PostBookResponseSchema,
        },
      },
      description: "Create book.",
    },
  },
  tags: ["[Admin] Books API"],
});

app.use(route.getRoutingPath(), authMiddleware);
app.openapi(route, async (c) => {
  const body = c.req.valid("json");
  const res = await bookRepository.create({ body });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as postBookApp };
