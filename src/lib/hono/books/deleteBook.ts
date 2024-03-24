import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import { DeleteBookRequestParamsSchema } from "@/lib/schema/api/books/DeleteBookRequestParams";
import { DeleteBookResponseSchema } from "@/lib/schema/api/books/DeleteBookResponse";

import { authMiddleware } from "@/lib/hono/middlewares/authMiddleware";
import { bookRepository } from "@/lib/repositories";

const app = new OpenAPIHono();

const route = createRoute({
  method: "delete",
  path: "/v1/books/{bookId}",
  request: {
    params: DeleteBookRequestParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: DeleteBookResponseSchema,
        },
      },
      description: "Delete book.",
    },
  },
  tags: ["[Admin] Books API"],
});

app.use(route.getRoutingPath(), authMiddleware);
app.openapi(route, async (c) => {
  const params = c.req.valid("param");
  const res = await bookRepository.delete({ params });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as deleteBookApp };
