import { NextResponse } from "next/server";
import { credentialService } from "@/services/credentialService";

export async function POST(request) {
  try {
    const body = await request.json();

    const { 
      token, 
      organization_name, 
      type, 
      email, 
      password, 
      description 
    } = body;

    if (!token || !organization_name || !type || !email || !password || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log('[API Credentials POST] Dados recebidos:', {
      organization_name,
      type,
      email,
      password: '***' + password.slice(-3),
      description
    });

    const result = await credentialService({
      token,
      organization_name,
      type,
      email,
      password,
      description
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    const message = err.message || "Unknown error";
    console.error('[API Credentials POST] Error:', message);

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