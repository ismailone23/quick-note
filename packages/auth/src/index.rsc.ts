import type { NextAuthResult } from "next-auth";
import NextAuth from "next-auth";
import { cache } from "react";

import { authConfig } from "./config";

export type { Session } from "next-auth";

const {
  handlers: defaultHandlers,
  auth: defaultAuth,
  signIn: defaultSignIn,
  signOut,
} = NextAuth(authConfig);

/**
 * This is the main way to get session data for your RSCs.
 * This will de-duplicate all calls to next-auth's default `auth()` function and only call it once per request
 */
const auth: NextAuthResult["auth"] = cache(defaultAuth);
const handlers: NextAuthResult["handlers"] = defaultHandlers;
const signIn: NextAuthResult["signIn"] = defaultSignIn;

export { auth, handlers, signIn, signOut };
