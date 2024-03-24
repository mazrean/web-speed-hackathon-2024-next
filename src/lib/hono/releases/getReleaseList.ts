import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import { GetReleaseListResponseSchema } from "@/lib/schema/api/releases/GetReleaseListResponse";

import { releaseRepository } from "@/lib/repositories";

const app = new OpenAPIHono();

const route = createRoute({
  method: "get",
  path: "/v1/releases",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetReleaseListResponseSchema,
        },
      },
      description: "Get release list.",
    },
  },
  tags: ["[App] Releases API"],
});

app.openapi(route, async (c) => {
  const res = await releaseRepository.readAll();

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as getReleaseListApp };
