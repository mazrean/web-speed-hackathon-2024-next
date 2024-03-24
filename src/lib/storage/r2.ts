import { R2Bucket } from "@cloudflare/workers-types";

export function getStorage() {
  return process.env.STORAGE as any as R2Bucket;
}
