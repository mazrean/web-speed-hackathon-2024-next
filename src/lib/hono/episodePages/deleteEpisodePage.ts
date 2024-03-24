import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import { DeleteEpisodePageRequestParamsSchema } from "@/lib/schema/api/episodePages/DeleteEpisodePageRequestParams";
import { DeleteEpisodePageResponseSchema } from "@/lib/schema/api/episodePages/DeleteEpisodePageResponse";

import { authMiddleware } from "@/lib/hono/middlewares/authMiddleware";
import { episodePageRepository } from "@/lib/repositories";

const app = new OpenAPIHono();

const route = createRoute({
  method: "delete",
  path: "/v1/episodePages/{episodePageId}",
  request: {
    params: DeleteEpisodePageRequestParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: DeleteEpisodePageResponseSchema,
        },
      },
      description: "Delete episode page.",
    },
  },
  tags: ["[Admin] Episode Pages API"],
});

app.use(route.getRoutingPath(), authMiddleware);
app.openapi(route, async (c) => {
  const params = c.req.valid("param");
  const res = await episodePageRepository.delete({ params });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as deleteEpisodePageApp };
