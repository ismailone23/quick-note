import type { NextAuthResult } from "next-auth";
import NextAuth from "next-auth";

import { authConfig } from "./config";

export type { Session } from "next-auth";

const {
  handlers: defaultHandlers,
  auth: defaultAuth,
  signIn,
  signOut,
} = NextAuth(authConfig);

const auth: NextAuthResult["auth"] = defaultAuth;
const handlers: NextAuthResult["handlers"] = defaultHandlers;

export { auth, handlers, signIn, signOut };

export {
  invalidateSessionToken,
  isSecureContext,
  validateToken,
} from "./config";
