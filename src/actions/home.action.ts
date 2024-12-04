import { db } from "@/db/db";

import { homeTable } from "@/db/schema";

import { IHome } from "@/interfaces/home.interface";

export const getHome = async () => {
  try {
    const response = await db.select().from(homeTable)

    console.log(response);
    if (response.length === 0) {
      return {} as IHome;
    }

    return response[0] as IHome;
  } catch (error) {
    console.log(error);
    return {} as IHome; 
  }
};