import { NextResponse, type NextRequest } from "next/server";

// Block Google (and other bots) from indexing Vercel preview hosts.
// Production traffic on www.rothenbury.com is unaffected.
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  if (host.endsWith(".vercel.app")) {
    const res = NextResponse.next();
    res.headers.set("x-robots-tag", "noindex, nofollow");
    return res;
  }
  return NextResponse.next();
}

export const config = {
  matcher:
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico|txt|xml)).*)",
};
