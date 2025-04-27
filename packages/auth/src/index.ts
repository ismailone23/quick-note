import type { NextAuthResult } from "next-auth";
import NextAuth from "next-auth";

import { authConfig } from "./config";

export type { Session } from "next-auth";

const {
  handlers: defaultHandlers,
  auth: defaultAuth,
  signIn: defaultSignIn,
  signOut,
} = NextAuth(authConfig);

const auth: NextAuthResult["auth"] = defaultAuth;
const handlers: NextAuthResult["handlers"] = defaultHandlers;
const signIn: NextAuthResult["signIn"] = defaultSignIn;

export { auth, handlers, signIn, signOut };
