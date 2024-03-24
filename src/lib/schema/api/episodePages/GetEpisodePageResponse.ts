import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

import { episodePage, image } from '../../models';

export const GetEpisodePageResponseSchema = createSelectSchema(episodePage)
  .pick({
    id: true,
    page: true,
  })
  .extend({
    image: createSelectSchema(image).pick({
      alt: true,
      id: true,
    }),
  });

export type GetEpisodePageResponse = z.infer<typeof GetEpisodePageResponseSchema>;
