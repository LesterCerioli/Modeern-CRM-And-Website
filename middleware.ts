import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth.utils"; // Assuming @/ is mapped to src/

const ALLOWED_ORIGINS = [
    "https://lts-us-website.vercel.app"
    // "http://localhost:3000" // For local development
];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const origin = req.headers.get("origin");

    // 1. Handle /api/auth/login: Public path, skip JWT check
    if (pathname.startsWith('/api/auth/login')) {
        // Proceed to CORS handling
        const response = NextResponse.next();
        if (origin && ALLOWED_ORIGINS.includes(origin)) {
            response.headers.set("Access-Control-Allow-Origin", origin);
        } else if (!origin && process.env.NODE_ENV !== 'production') {
            response.headers.set("Access-Control-Allow-Origin", "*"); // Allow no origin in dev
        } else if (origin) { // Origin present but not in ALLOWED_ORIGINS
             return new NextResponse(JSON.stringify({ error: "CORS: Unauthorized origin for login path" }), { status: 403, headers: { "Content-Type": "application/json" } });
        } else { // No origin and in production for a public path
             return new NextResponse(JSON.stringify({ error: "CORS: Origin header required for login path" }), { status: 403, headers: { "Content-Type": "application/json" } });
        }
        response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
        return response;
    }

    // 2. Handle /api/candidates: Protected path, perform JWT check
    if (pathname.startsWith('/api/candidates')) {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Unauthorized: Missing or invalid token format" },
                { status: 401 }
            );
        }
        const token = authHeader.substring(7); // Remove "Bearer "
        try {
            await verifyToken(token);
            // Token is valid, proceed to CORS handling for this path
        } catch (error) {
            console.error("Token verification error for /api/candidates:", error);
            return NextResponse.json(
                { error: "Unauthorized: Invalid or expired token" },
                { status: 401 }
            );
        }
    }

    // 3. Apply CORS for all other API paths, and for /api/candidates if JWT was successful
    // The matcher config ensures this middleware only runs for /api/:path*
    // If we've reached here, either the path is not /api/auth/login and not /api/candidates,
    // or it is /api/candidates and JWT verification passed.
    
    const response = NextResponse.next(); // Default action is to allow the request

    if (origin && ALLOWED_ORIGINS.includes(origin)) {
        response.headers.set("Access-Control-Allow-Origin", origin);
    } else if (!origin && process.env.NODE_ENV !== 'production') {
        response.headers.set("Access-Control-Allow-Origin", "*"); // Allow no origin (e.g. Postman) in dev
    } else if (origin) { // Origin is present but not in ALLOWED_ORIGINS
        // This is a non-public path or /api/candidates (which passed JWT) with a disallowed origin
        return new NextResponse(
            JSON.stringify({ error: "CORS: Unauthorized origin" }),
            { status: 403, headers: { "Content-Type": "application/json" } }
        );
    } else { // No origin, and in production (for a non-public path)
        return new NextResponse(
            JSON.stringify({ error: "CORS: Origin header required" }),
            { status: 403, headers: { "Content-Type": "application/json" } }
        );
    }

    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    return response;
}

export const config = {
    matcher: "/api/:path*",
};