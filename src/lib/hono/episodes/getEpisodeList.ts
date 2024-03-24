import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import { GetEpisodeListRequestQuerySchema } from "@/lib/schema/api/episodes/GetEpisodeListRequestQuery";
import { GetEpisodeListResponseSchema } from "@/lib/schema/api/episodes/GetEpisodeListResponse";

import { episodeRepository } from "@/lib/repositories";

const app = new OpenAPIHono();

const route = createRoute({
  method: "get",
  path: "/v1/episodes",
  request: {
    query: GetEpisodeListRequestQuerySchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetEpisodeListResponseSchema,
        },
      },
      description: "Get episode.",
    },
  },
  tags: ["[App] Episodes API"],
});

app.openapi(route, async (c) => {
  const query = c.req.valid("query");
  const res = await episodeRepository.readAll({ query });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as getEpisodeListApp };
