import { db } from "@/db/db";

import { homeTable } from "@/db/schema";

export const getHome = async () => {
  try {
    const response = await db.select().from(homeTable)
    return response;
  } catch (error) {
    console.log(error);
  }
};