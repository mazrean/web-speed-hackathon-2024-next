import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import { DeleteEpisodeRequestParamsSchema } from "@/lib/schema/api/episodes/DeleteEpisodeRequestParams";
import { DeleteEpisodeResponseSchema } from "@/lib/schema/api/episodes/DeleteEpisodeResponse";

import { authMiddleware } from "@/lib/hono/middlewares/authMiddleware";
import { episodeRepository } from "@/lib/repositories";

const app = new OpenAPIHono();

const route = createRoute({
  method: "delete",
  path: "/v1/episodes/{episodeId}",
  request: {
    params: DeleteEpisodeRequestParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: DeleteEpisodeResponseSchema,
        },
      },
      description: "Get episode list.",
    },
  },
  tags: ["[Admin] Episodes API"],
});

app.use(route.getRoutingPath(), authMiddleware);
app.openapi(route, async (c) => {
  const params = c.req.valid("param");
  const res = await episodeRepository.delete({ params });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as deleteEpisodeApp };
