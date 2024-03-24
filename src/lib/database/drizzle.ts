import { D1Database } from "@cloudflare/workers-types";
import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";

import * as schema from "@/lib/schema/models";
import { gte } from "drizzle-orm";

export function initializeDatabase() {
  getDatabase()
    .delete(schema.author)
    .where(gte(schema.author.createdAt, "2024-03-23"))
    .execute();
  getDatabase()
    .delete(schema.book)
    .where(gte(schema.book.createdAt, "2024-03-23"))
    .execute();
  getDatabase()
    .delete(schema.episode)
    .where(gte(schema.episode.createdAt, "2024-03-23"))
    .execute();
  getDatabase()
    .delete(schema.episodePage)
    .where(gte(schema.episodePage.createdAt, "2024-03-23"))
    .execute();
  getDatabase()
    .delete(schema.feature)
    .where(gte(schema.feature.createdAt, "2024-03-23"))
    .execute();
  getDatabase()
    .delete(schema.image)
    .where(gte(schema.image.createdAt, "2024-03-23"))
    .execute();
  getDatabase()
    .delete(schema.ranking)
    .where(gte(schema.ranking.createdAt, "2024-03-23"))
    .execute();
  getDatabase()
    .delete(schema.release)
    .where(gte(schema.release.createdAt, "2024-03-23"))
    .execute();
  getDatabase()
    .delete(schema.user)
    .where(gte(schema.user.createdAt, "2024-03-23"))
    .execute();
}

export function getDatabase() {
  return drizzle(process.env.DB as any as D1Database, {
    schema,
  }) as DrizzleD1Database<typeof schema>;
}
