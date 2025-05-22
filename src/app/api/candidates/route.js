import CandidateService from "@/app/services/candidateService";



const candidateService = new CandidateService();

export async function GET() {
    try {
        const candidates = await candidateService.findAll();
        return new Response(
            JSON.stringify(candidates),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Candidate API Error:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const requiredFields = ["firstName", "lastName", "email", /* ... */];


        for (const field of requiredFields) {
            if (!body[field]) {
                return new Response(
                    JSON.stringify({ error: `Field "${field}" is required` }),
                    { status: 400, headers: { "Content-Type": "application/json" } }
                );
            }
        }


        const existingCandidate = await candidateService.findByEmail(body.email);
        if (existingCandidate) {
            return new Response(
                JSON.stringify({ error: "Candidate already exists" }),
                { status: 409, headers: { "Content-Type": "application/json" } }
            );
        }


        const newCandidate = await candidateService.create({
            id: uuid(),
            ...body
        });

        return new Response(
            JSON.stringify({ message: "Candidate created successfully", candidate: newCandidate }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Candidate API Error:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
