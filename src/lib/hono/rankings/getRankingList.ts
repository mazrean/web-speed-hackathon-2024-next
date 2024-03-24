import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import { GetRankingListRequestQuerySchema } from "@/lib/schema/api/rankings/GetRankingListRequestQuery";
import { GetRankingListResponseSchema } from "@/lib/schema/api/rankings/GetRankingListResponse";

import { rankingRepository } from "@/lib/repositories";

const app = new OpenAPIHono();

const route = createRoute({
  method: "get",
  path: "/v1/rankings",
  request: {
    query: GetRankingListRequestQuerySchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetRankingListResponseSchema,
        },
      },
      description: "Get feature list.",
    },
  },
  tags: ["[App] Rankings API"],
});

app.openapi(route, async (c) => {
  const query = c.req.valid("query");
  const res = await rankingRepository.readAll({ query });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as getRankingListApp };
