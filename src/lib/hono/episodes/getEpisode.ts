import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import { GetEpisodeRequestParamsSchema } from "@/lib/schema/api/episodes/GetEpisodeRequestParams";
import { GetEpisodeResponseSchema } from "@/lib/schema/api/episodes/GetEpisodeResponse";

import { episodeRepository } from "@/lib/repositories";

const app = new OpenAPIHono();

const route = createRoute({
  method: "get",
  path: "/v1/episodes/{episodeId}",
  request: {
    params: GetEpisodeRequestParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetEpisodeResponseSchema,
        },
      },
      description: "Get episode.",
    },
  },
  tags: ["[App] Episodes API"],
});

app.openapi(route, async (c) => {
  const params = c.req.valid("param");
  const res = await episodeRepository.read({ params });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as getEpisodeApp };
