import type { NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

import { findUser } from "./actions/user.action";

import { loginSchema } from "./utils";
 
export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log({ credentials });
        const { data, success } = loginSchema.safeParse(credentials)

        if (!success) {
          console.log('Error en validacion de credenciales');
          throw new Error("Las credenciales no son validas.")
        }

        const user = await findUser(data.email);

        if (!user || !user.password) {
          console.log('Error en validacion del usuario');
          throw new Error("El usuario no existe.")
        }

        const validPassword = bcrypt.compareSync(data.password, user.password);

        if (!validPassword) {
          console.log('Error en validacion de password');
          throw new Error("Las credenciales no son validas.")
        }

        return { ...user, id: user.id.toString() };
      },
    }),
  ],
} satisfies NextAuthConfig;
