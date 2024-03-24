import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import { GetEpisodePageRequestParamsSchema } from "@/lib/schema/api/episodePages/GetEpisodePageRequestParams";
import { GetEpisodePageResponseSchema } from "@/lib/schema/api/episodePages/GetEpisodePageResponse";

import { episodePageRepository } from "@/lib/repositories";

const app = new OpenAPIHono();

const route = createRoute({
  method: "get",
  path: "/v1/episodePages/{pageId}",
  request: {
    params: GetEpisodePageRequestParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetEpisodePageResponseSchema,
        },
      },
      description: "Get episode page.",
    },
  },
  tags: ["[App] Episode Pages API"],
});

app.openapi(route, async (c) => {
  const params = c.req.valid("param");
  const res = await episodePageRepository.read({ params });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as getEpisodePageApp };
