import fs from "node:fs/promises";
import path from "node:path";

import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import { PostImageRequestBodySchema } from "@/lib/schema/api/images/PostImageRequestBody";
import { PostImageResponseSchema } from "@/lib/schema/api/images/PostImageResponse";

import { IMAGES_PATH } from "@/lib/constants/paths";
import { authMiddleware } from "@/lib/hono/middlewares/authMiddleware";
import { imageRepository } from "@/lib/repositories";
import { Image } from "image-js";
import { jpegConverter } from "@/lib/image-converters/jpegConverter";
import { webpConverter } from "@/lib/image-converters/webpConverter";

const app = new OpenAPIHono();

const route = createRoute({
  method: "post",
  path: "/v1/images",
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: PostImageRequestBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: PostImageResponseSchema,
        },
      },
      description: "Create image.",
    },
  },
  tags: ["[Admin] Images API"],
});

app.use(route.getRoutingPath(), authMiddleware);
app.openapi(route, async (c) => {
  const formData = c.req.valid("form");

  const result = await imageRepository.create({
    body: {
      alt: formData.alt,
    },
  });

  if (result.isErr()) {
    throw result.error;
  }

  const image = new Image(
    await jpegConverter.decode(
      Buffer.from(await formData.content.arrayBuffer())
    )
  );

  const width = Math.min(image.width, 256);
  const height = Math.min(image.height, 256);
  const scale = Math.max(width / image.width, height / image.height) || 1;
  const manipulated = image.resize({
    height: Math.ceil(image.height * scale),
    preserveAspectRatio: true,
    width: Math.ceil(image.width * scale),
  });

  const resBinary = await webpConverter.encode({
    colorSpace: "srgb",
    data: new Uint8ClampedArray(manipulated.data),
    height: manipulated.height,
    width: manipulated.width,
  });

  await fs.mkdir(IMAGES_PATH, {
    recursive: true,
  });
  await fs.writeFile(
    path.resolve(IMAGES_PATH, `./${result.value.id}.webp`),
    resBinary
  );

  return c.json(result.value);
});

export { app as postImageApp };
