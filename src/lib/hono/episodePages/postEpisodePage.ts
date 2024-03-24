import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import { PostEpisodePageRequestBodySchema } from "@/lib/schema/api/episodePages/PostEpisodePageRequestBody";
import { PostEpisodePageResponseSchema } from "@/lib/schema/api/episodePages/PostEpisodePageResponse";

import { authMiddleware } from "@/lib/hono/middlewares/authMiddleware";
import { episodePageRepository } from "@/lib/repositories";

const app = new OpenAPIHono();

const route = createRoute({
  method: "post",
  path: "/v1/episodePages",
  request: {
    body: {
      content: {
        "application/json": {
          schema: PostEpisodePageRequestBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: PostEpisodePageResponseSchema,
        },
      },
      description: "Create episode page.",
    },
  },
  tags: ["[Admin] Episode Pages API"],
});

app.use(route.getRoutingPath(), authMiddleware);
app.openapi(route, async (c) => {
  const body = c.req.valid("json");
  const res = await episodePageRepository.create({ body });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as postEpisodePageApp };
