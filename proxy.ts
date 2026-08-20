import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const locale = request.nextUrl.pathname.match(/^\/(en|es)(?:\/|$)/)?.[1] ?? "fr";
  requestHeaders.set("x-tibaldo-locale", locale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next|assets|favicon\\.svg|favicon\\.png).*)"],
};
