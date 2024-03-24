import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { image } from "../../models";

export const PostImageRequestBodySchema = createInsertSchema(image)
  .pick({
    alt: true,
  })
  .extend({
    content: z.custom<File>((data) => data instanceof File),
  });

export type PostImageRequestBody = z.infer<typeof PostImageRequestBodySchema>;
