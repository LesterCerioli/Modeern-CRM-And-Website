
import { NextResponse } from "next/server";
import { createProject } from "@/services/projectService"; 

export async function POST(request) {
  try {
    const body = await request.json();

    const { token, organization_name, name, code, description, owner_username, template_agile_method, settings } = body;

    if (!token || !organization_name || !name || !code || !description || !owner_username || !template_agile_method) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Criar objeto ProjectFormData
    const projectFormData = {
      projectName: name,
      agileMethodology: template_agile_method,
      projectCode: code,
      organization: organization_name,
      description: description,
      ownerUser: owner_username
    };

    const result = await createProject(projectFormData);

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
