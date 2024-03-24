import fs from "node:fs/promises";

import {
  DATABASE_PATH,
  DATABASE_SEED_PATH,
  IMAGES_PATH,
  IMAGES_SEED_PATH,
} from "@/lib/constants/paths";

import { initializeDatabase } from "./drizzle";

export const seeding = async () => {
  await fs.copyFile(DATABASE_SEED_PATH, DATABASE_PATH);

  const stat = await fs.stat(IMAGES_PATH).catch(async () => null);
  if (stat) {
    await fs.rm(IMAGES_PATH, { recursive: true });
  }
  await fs.mkdir(IMAGES_PATH);

  const files = await fs.readdir(IMAGES_SEED_PATH);
  for (const file of files) {
    await fs.copyFile(`${IMAGES_SEED_PATH}/${file}`, `${IMAGES_PATH}/${file}`);
  }

  initializeDatabase();
  console.log("Finished seeding");
};
