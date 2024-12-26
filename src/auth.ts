import NextAuth from "next-auth";

import { db } from "./db/connection";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { authConfig } from "./auth.config";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  ...authConfig,
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
  }
});