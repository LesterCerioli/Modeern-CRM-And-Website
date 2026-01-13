import { CandidateService } from "@/app/services/candidateService";

const service = new CandidateService();

function isValidLinkedInUrl(url) {
  const pattern = /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
  return pattern.test(url);
}

export async function POST(request) {
  try {
    const body = await request.json();

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "telephone",
      "city",
      "state",
      "country",
      "linkedinUrl"
    ];

    const missing = requiredFields.filter((field) => !body[field]);
    if (missing.length > 0) {
      return new Response(
        JSON.stringify({ error: `Missing fields: ${missing.join(", ")}` }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!isValidLinkedInUrl(body.linkedinUrl)) {
      return new Response(
        JSON.stringify({
          error: "Invalid LinkedIn URL format. Expected: https://www.linkedin.com/in/{username}/",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const created = await service.create(body);

    return new Response(
      JSON.stringify({ message: "Candidate created successfully", candidate: created }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in POST /api/candidates:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Missing 'email' query parameter" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const candidate = await service.findByEmail(email);

    return new Response(
      JSON.stringify(candidate),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in GET /api/candidates:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }
}