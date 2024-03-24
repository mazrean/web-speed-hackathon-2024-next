import { initializeDatabase } from "./drizzle";

export const seeding = async () => {
  initializeDatabase();
  console.log("Finished seeding");
};
