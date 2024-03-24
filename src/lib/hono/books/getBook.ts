import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import { GetBookRequestParamsSchema } from "@/lib/schema/api/books/GetBookRequestParams";
import { GetBookResponseSchema } from "@/lib/schema/api/books/GetBookResponse";

import { bookRepository } from "@/lib/repositories";

const app = new OpenAPIHono();

const route = createRoute({
  method: "get",
  path: "/v1/books/{bookId}",
  request: {
    params: GetBookRequestParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetBookResponseSchema,
        },
      },
      description: "Get book.",
    },
  },
  tags: ["[App] Books API"],
});

app.openapi(route, async (c) => {
  const params = c.req.valid("param");
  const res = await bookRepository.read({ params });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as getBookApp };
