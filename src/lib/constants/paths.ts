import path from "node:path";

const WORKSPACE_DIR = process.cwd()!;
const PACKAGE_DIR = WORKSPACE_DIR;

export const DATABASE_PATH = path.resolve(PACKAGE_DIR, "./database.sqlite");

export const DATABASE_SEED_PATH = path.resolve(
  PACKAGE_DIR,
  "./seeds/database.sqlite"
);

export const IMAGES_PATH = path.resolve(PACKAGE_DIR, "./images");

export const IMAGES_SEED_PATH = path.resolve(PACKAGE_DIR, "./seeds/images");

console.log(WORKSPACE_DIR);
