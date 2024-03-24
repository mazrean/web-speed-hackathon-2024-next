import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import { GetAuthorRequestParamsSchema } from "@/lib/schema/api/authors/GetAuthorRequestParams";
import { GetAuthorResponseSchema } from "@/lib/schema/api/authors/GetAuthorResponse";

import { authorRepository } from "@/lib/repositories";

const app = new OpenAPIHono();

const route = createRoute({
  method: "get",
  path: "/v1/authors/{authorId}",
  request: {
    params: GetAuthorRequestParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetAuthorResponseSchema,
        },
      },
      description: "Get author.",
    },
  },
  tags: ["[App] Authors API"],
});

app.openapi(route, async (c) => {
  const params = c.req.valid("param");
  const res = await authorRepository.read({ params });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as getAuthorApp };
