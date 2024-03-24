import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import { GetEpisodePageListRequestQuerySchema } from "@/lib/schema/api/episodePages/GetEpisodePageListRequestQuery";
import { GetEpisodePageListResponseSchema } from "@/lib/schema/api/episodePages/GetEpisodePageListResponse";

import { episodePageRepository } from "@/lib/repositories";

const app = new OpenAPIHono();

const route = createRoute({
  method: "get",
  path: "/v1/episodePages",
  request: {
    query: GetEpisodePageListRequestQuerySchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetEpisodePageListResponseSchema,
        },
      },
      description: "Get episode page list.",
    },
  },
  tags: ["[App] Episode Pages API"],
});

app.openapi(route, async (c) => {
  const query = c.req.valid("query");
  const res = await episodePageRepository.readAll({ query });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as getEpisodePageListApp };
