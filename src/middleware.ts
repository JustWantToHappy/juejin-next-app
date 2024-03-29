import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const session = request.headers
		.get("cookie")
		?.includes("next-auth.session-token");
	if (session) {
		return NextResponse.next();
	} else {
		return NextResponse.redirect(new URL("/", request.url));
	}
}

export const config = {
	matcher: ["/editor"],
};
