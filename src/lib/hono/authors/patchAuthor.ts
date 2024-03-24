import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import { PatchAuthorRequestBodySchema } from "@/lib/schema/api/authors/PatchAuthorRequestBody";
import { PatchAuthorRequestParamsSchema } from "@/lib/schema/api/authors/PatchAuthorRequestParams";
import { PatchAuthorResponseSchema } from "@/lib/schema/api/authors/PatchAuthorResponse";

import { authMiddleware } from "@/lib/hono/middlewares/authMiddleware";
import { authorRepository } from "@/lib/repositories";

const app = new OpenAPIHono();

const route = createRoute({
  method: "patch",
  path: "/v1/authors/{authorId}",
  request: {
    body: {
      content: {
        "application/json": {
          schema: PatchAuthorRequestBodySchema,
        },
      },
    },
    params: PatchAuthorRequestParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: PatchAuthorResponseSchema,
        },
      },
      description: "Update author.",
    },
  },
  tags: ["[Admin] Authors API"],
});

app.use(route.getRoutingPath(), authMiddleware);
app.openapi(route, async (c) => {
  const params = c.req.valid("param");
  const body = c.req.valid("json");
  const res = await authorRepository.update({ body, params });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as patchAuthorApp };
