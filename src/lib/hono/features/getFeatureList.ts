import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import { GetFeatureListRequestQuerySchema } from "@/lib/schema/api/features/GetFeatureListRequestQuery";
import { GetFeatureListResponseSchema } from "@/lib/schema/api/features/GetFeatureListResponse";

import { featureRepository } from "@/lib/repositories";

const app = new OpenAPIHono();

const route = createRoute({
  method: "get",
  path: "/v1/features",
  request: {
    query: GetFeatureListRequestQuerySchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetFeatureListResponseSchema,
        },
      },
      description: "Get feature list.",
    },
  },
  tags: ["[App] Features API"],
});

app.openapi(route, async (c) => {
  const query = c.req.valid("query");
  const res = await featureRepository.readAll({ query });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as getFeatureListApp };
