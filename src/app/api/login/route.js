import { NextResponse } from "next/server";
import { loginUser } from "@/services/loginUser"; // adjust path if needed

export async function POST(request) {
  try {
    const body = await request.json();

    const { token, email, password, role } = body;

    if (!token || !email || !password || !role) {
      return NextResponse.json(
        { error: "Missing required fields: token, email, password, role" },
        { status: 400 }
      );
    }

    const result = await loginUser({ token, email, password, role });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    const message = err.message || "Unknown error";

    if (message.includes("401")) {
      return NextResponse.json(
        { error: "Unauthorized", details: message },
        { status: 401 }
      );
    }

    if (message.includes("404")) {
      return NextResponse.json(
        { error: "Not Found", details: message },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error", details: message },
      { status: 500 }
    );
  }
}
