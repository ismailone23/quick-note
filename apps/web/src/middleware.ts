import { auth } from "@workspace/auth";
import { NextResponse } from "next/server";

export default auth(async (req) => {
  const pathname = req.nextUrl.pathname;

  if (req.auth && pathname.startsWith("/login")) {
    const callbackUrl = req.nextUrl.searchParams.get("callbackUrl");
    return NextResponse.redirect(new URL(callbackUrl ?? "/workspace", req.url));
  }
  if (req.auth && pathname === "/") {
    return NextResponse.redirect(new URL("/workspace", req.url));
  }
  if (!req.auth && !pathname.startsWith("/login")) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
});

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|js|images).*)"],
};
