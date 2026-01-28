import { NextResponse } from "next/server";
import { getRawCredentials } from "@/services/credentialService";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const organization_name = searchParams.get('organization_name') || undefined;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')) : undefined;
    const size = searchParams.get('size') ? parseInt(searchParams.get('size')) : undefined;

    console.log('[API Credentials Raw GET] Parâmetros recebidos:', {
      organization_name,
      page,
      size
    });

    const result = await getRawCredentials({
      organization_name,
      page,
      size
    });

    console.log('[API Credentials Raw GET] Success:', {
      credentials_count: result.credentials?.length || 0
    });

    return NextResponse.json(result, { status: 200 });
    
  } catch (err) {
    const message = err.message || "Unknown error";
    console.error('[API Credentials Raw GET] Error:', message);

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