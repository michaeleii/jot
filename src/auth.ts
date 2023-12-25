import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "./db";

export const { handlers, auth, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [google],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
