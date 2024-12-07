'use server';

import { db } from "@/db/connection";

import { homeTable } from "@/db/schema";

import { eq } from "drizzle-orm";

import { IHome, Response, UpdateHomeData } from "@/interfaces";
import { revalidatePath } from "next/cache";

export const getHome = async (): Promise<Response<IHome>> => {
  try {
    const response = await db.select().from(homeTable);

    if (!response || response.length === 0) {
      return { data: null, error: "No se encontraron datos" };
    }

    return { data: response[0], error: null };
  } catch (error) {
    console.log(error);
    const errorMessage = error instanceof Error ? error.message : "Ups, algo salió mal";
    return { data: null, error: errorMessage }; 
  }
};

export const updateHome = async (id: number, data: UpdateHomeData): Promise<Response<IHome>> => {
  try {
    if (!data || Object.keys(data).length === 0) {
      throw new Error("No hay datos para actualizar.");
    }

    const [updatedRecord] = await db
      .update(homeTable)
      .set(data)
      .where(eq(homeTable.id, id))
      .returning();

    if (!updatedRecord) {
      return {
        data: null,
        error: `No se encontró un registro con el ID ${id} para actualizar.`
      };
    }

    revalidatePath('/admin');
    return { data: updatedRecord, error: null };
  } catch (error) {
    console.log(error);
    const errorMessage = error instanceof Error ? error.message : "Ups, ocurrió un error al actualizar";
    return { data: null, error: errorMessage }; 
  }
}