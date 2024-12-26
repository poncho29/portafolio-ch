"use server";

import { AuthError } from "next-auth";
import { z } from "zod";

import { loginSchema } from "@/utils/auth-schema";

import { signIn } from "@/auth";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn("credentials", {
      ...values,
      redirect: false,
    });

    return { success: true, message: "Inicio de sesión exitoso" };
  } catch (error) {
    console.log(error);
    const defaultMessage = "Error al iniciar sesión";

    if (error instanceof AuthError) {
      const message = error?.cause?.err?.message || defaultMessage;
      return { success: false, message };
    }

    return { success: false, message: defaultMessage };
  }
}
