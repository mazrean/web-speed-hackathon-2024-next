import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import { GetAuthorListRequestQuerySchema } from "@/lib/schema/api/authors/GetAuthorListRequestQuery";
import { GetAuthorListResponseSchema } from "@/lib/schema/api/authors/GetAuthorListResponse";

import { authorRepository } from "@/lib/repositories";

const app = new OpenAPIHono();

const route = createRoute({
  method: "get",
  path: "/v1/authors",
  request: {
    query: GetAuthorListRequestQuerySchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetAuthorListResponseSchema,
        },
      },
      description: "Get author list.",
    },
  },
  tags: ["[App] Authors API"],
});

app.openapi(route, async (c) => {
  const query = c.req.valid("query");
  const res = await authorRepository.readAll({ query });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as getAuthorListApp };
