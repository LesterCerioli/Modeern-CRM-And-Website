import { saveDataCandidates } from "@/app/services/saveDataCandidates";
import { CandidateDTO } from "@/domain/dtos/candidateDTO";

// ✅ LinkedIn URL Validation
function isValidLinkedInUrl(linkedinUrl) {
    const linkedInPattern = /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
    return linkedInPattern.test(linkedinUrl);
}



export async function POST(req) {
    try {
        const body = await req.json();
        console.log("Received request body:", body); // Debugging log

        // Validate Required Fields
        if (!body.firstName || !body.lastName || !body.email || !body.telephone || !body.city || !body.state || !body.country || !body.linkedinUrl) {
            console.error("❌ Missing fields:", body);
            return new Response(
                JSON.stringify({ error: "All fields are required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }


        // Validate LinkedIn URL
        if (!isValidLinkedInUrl(body.linkedinUrl)) {
            console.error("❌ Invalid LinkedIn URL:", body.linkedinUrl);
            return new Response(
                JSON.stringify({ error: "Invalid LinkedIn URL format. Expected format: https://www.linkedin.com/in/{username}/" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Save candidate data
        await saveDataCandidates(body);

        return new Response(
            JSON.stringify({ message: "Data received successfully" }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("API Error:", error);

        return new Response(
            JSON.stringify({ error: error.message || "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
