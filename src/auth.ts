import NextAuth from "next-auth";

import { DrizzleAdapter } from "@auth/drizzle-adapter"

import authConfig from "./auth.config";
import { db } from "./db/connection";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
});