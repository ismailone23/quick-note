import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@workspace/db";
import {
  accounts,
  authenticators,
  sessions,
  users,
  verificationTokens,
} from "@workspace/db/schema";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const adapter =
  process.env.RUNTIME === "edge"
    ? undefined
    : DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
        authenticatorsTable: authenticators,
      });

export const authConfig: NextAuthConfig = {
  trustHost: true,
  providers: [GoogleProvider({ allowDangerousEmailAccountLinking: true })],
  secret: process.env.AUTH_SECRET,
  adapter,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/login",
    error: "/login",
  },
};
