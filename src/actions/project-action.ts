'use server';

import { desc, eq } from "drizzle-orm";

import { db } from "@/db/connection";
import { projects } from "@/db/schema";

import { parseStack } from "@/utils";

import { ICreateProject } from "@/interfaces";
import { revalidatePath } from "next/cache";

export const getAllProjects = async () => {
  try {
    const allProjects = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt));

    if (!allProjects) {
      return { data: null, error: "No se encontraron datos" };
    }

    const parsedData = allProjects.map((project) => ({ ...project, stack: parseStack(project.stack) }));

    return {
      data: parsedData,
      error: null
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Ups, algo salió mal";

    return { data: null, error: errorMessage };
  }
}

export const getProjectById = async (id: number) => {
  try {
    const response = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id));

    if (!response || response.length === 0) {
      return { data: null, error: "No se encontraron datos" };
    }

    return { data: response[0], error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Ups, algo salió mal";

    return { data: null, error: errorMessage };
  }
}

export const createProject = async (project: ICreateProject) => {
  try {
    const { stack, ...rest } = project;

    await db.insert(projects).values({
      ...rest,
      stack: JSON.stringify(stack)
    });

    revalidatePath("/proyectos");

    return { data: "Proyecto creado con éxito", error: null };
    // return { data: resp, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Ups, algo salió mal";

    return { data: null, error: errorMessage }; 
  }
}

export const updateProject = async (id: number, values: ICreateProject) => {
  try {
    const { stack, ...rest } = values;

    await db
      .update(projects)
      .set({ ...rest, stack: JSON.stringify(stack) })
      .where(eq(projects.id, id));

    revalidatePath("/proyectos");

    return { data: "Proyecto actualizado con éxito", error: null };
    // return { data: result, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Ups, algo salió mal";

    return { data: null, error: errorMessage }; 
  }
}

export const deleteProjectById = async (id: number) => {
  try {
    const result = await db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning({ deletedId: projects.id });

    if (result.length === 0) {
      throw new Error("Proyecto no encontrado");
    }

    revalidatePath("/proyectos");

    return { data: true, error: null };
  } catch (error) {
    console.error("Error al eliminar el proyecto:", error);
    const errorMessage = error instanceof Error ? error.message : "Ups, algo salió mal";
    return { data: false, error: errorMessage };
  }
}
