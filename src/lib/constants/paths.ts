import path from "node:path";

const WORKSPACE_DIR = process.cwd()!;
const PACKAGE_DIR = WORKSPACE_DIR;

export const DATABASE_PATH = path.resolve(
  PACKAGE_DIR,
  "./dist/database.sqlite"
);

export const DATABASE_SEED_PATH = path.resolve(
  PACKAGE_DIR,
  "./seeds/database.sqlite"
);

export const IMAGES_PATH = path.resolve(PACKAGE_DIR, "./dist/images");

export const CLIENT_STATIC_PATH = path.resolve(
  WORKSPACE_DIR,
  "./workspaces/client/dist"
);

export const INDEX_HTML_PATH = path.resolve(PACKAGE_DIR, "./index.html");
