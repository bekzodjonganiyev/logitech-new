import { NextResponse } from "next/server";
import { getCookie } from 'cookies-next';
import type { NextRequest } from "next/server"

import { decodeToken } from "./lib/checkAuth";

export default function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const accessToken = getCookie('access', {req: request, res: response });
  const refreshToken = getCookie('refresh', {req: request, res: response });

  const a = decodeToken(accessToken)
  const b = decodeToken(refreshToken)

  if (a && (a.exp as number) * 1000 > Date.now()) {
    return response
  }

  const absoluteURL = new URL("/", request.nextUrl.origin);

  return NextResponse.redirect(absoluteURL.toString());
}

export const config = {
  matcher: ['/checkout/:path*', '/profile/:path*'],
};
