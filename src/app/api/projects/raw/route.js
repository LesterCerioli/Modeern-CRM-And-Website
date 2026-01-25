import { NextResponse } from "next/server";
import { getRawProjects } from "@/services/projectService";

export async function GET(request) {
  try {
    
    const { searchParams } = new URL(request.url);
    
    const organization_name = searchParams.get('organization_name') || undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : undefined;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')) : undefined;
    const include_deleted = searchParams.get('include_deleted') === 'true';

    
    const params = {};
    
    if (organization_name !== undefined) {
      params.organization_name = organization_name;
    }
    
    if (limit !== undefined && !isNaN(limit)) {
      params.limit = limit;
    }
    
    if (offset !== undefined && !isNaN(offset)) {
      params.offset = offset;
    }
    
    params.include_deleted = include_deleted;

    console.log('[API Projects Raw GET] Parâmetros recebidos:', params);

    
    const result = await getRawProjects(params);

    return NextResponse.json(result, { status: 200 });
    
  } catch (err) {
    const message = err.message || "Unknown error";
    console.error('[API Projects Raw GET] Error:', message);

    
    if (message.includes("401")) {
      return NextResponse.json(
        { error: "Unauthorized", details: message },
        { status: 401 }
      );
    }

    if (message.includes("403")) {
      return NextResponse.json(
        { error: "Forbidden", details: message },
        { status: 403 }
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