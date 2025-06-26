import { CandidateService } from '@/services/CandidateService';

/**
 * Validação de URL do LinkedIn
 * @param {string} linkedinUrl  * @returns {boolean} - True se a URL for válida
 */
function isValidLinkedInUrl(linkedinUrl) {
    const linkedInPattern = /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
    return linkedInPattern.test(linkedinUrl);
}

/**
 * Gera um ID único para o candidato
 * @returns {string} - ID gerado
 */
function generateCandidateId() {
    return 'cand_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
}

export async function POST(req) {
    const candidateService = new CandidateService();
    
    try {
        const body = await req.json();
        console.log("[API] Received candidate data:", body);

        
        const requiredFields = [
            'firstName', 
            'lastName', 
            'email', 
            'telephone', 
            'city', 
            'state', 
            'country', 
            'linkedinUrl'
        ];
        
        const missingFields = requiredFields.filter(field => !body[field]);
        
        if (missingFields.length > 0) {
            console.error("[API] Missing required fields:", missingFields);
            return new Response(
                JSON.stringify({ 
                    success: false,
                    error: "Missing required fields",
                    missingFields 
                }),
                { 
                    status: 400, 
                    headers: { 
                        "Content-Type": "application/json",
                        "X-Error-Type": "validation" 
                    } 
                }
            );
        }

        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            console.error("[API] Invalid email format:", body.email);
            return new Response(
                JSON.stringify({ 
                    success: false,
                    error: "Invalid email format" 
                }),
                { status: 400 }
            );
        }

        
        if (!isValidLinkedInUrl(body.linkedinUrl)) {
            console.error("[API] Invalid LinkedIn URL:", body.linkedinUrl);
            return new Response(
                JSON.stringify({ 
                    success: false,
                    error: "Invalid LinkedIn URL format",
                    expectedFormat: "https://www.linkedin.com/in/username" 
                }),
                { status: 400 }
            );
        }

        
        const candidateData = {
            id: generateCandidateId(),
            firstName: body.firstName.trim(),
            lastName: body.lastName.trim(),
            email: body.email.toLowerCase().trim(),
            telephone: body.telephone.replace(/\D/g, ''), // Remove caracteres não numéricos
            city: body.city.trim(),
            state: body.state.trim().toUpperCase(),
            country: body.country.trim(),
            linkedinUrl: body.linkedinUrl.trim()
        };

        
        const createdCandidate = await candidateService.create(candidateData);
        console.log("[API] Candidate created successfully:", createdCandidate.id);

        return new Response(
            JSON.stringify({ 
                success: true,
                message: "Candidate created successfully",
                candidateId: createdCandidate.id,
                timestamp: new Date().toISOString()
            }),
            { 
                status: 201,
                headers: { 
                    "Content-Type": "application/json",
                    "Location": `/api/candidates/${createdCandidate.id}`,
                    "X-Candidate-ID": createdCandidate.id
                } 
            }
        );

    } catch (error) {
        console.error("[API] Error processing request:", error);

        
        if (error.message.includes("already exists")) {
            return new Response(
                JSON.stringify({ 
                    success: false,
                    error: "Candidate with this email already exists",
                    code: "EMAIL_CONFLICT"
                }),
                { 
                    status: 409,
                    headers: { "X-Error-Type": "duplicate" } 
                }
            );
        }

        
        return new Response(
            JSON.stringify({ 
                success: false,
                error: "Internal server error",
                code: "INTERNAL_ERROR",
                ...(process.env.NODE_ENV === 'development' && { 
                    detail: error.message,
                    stack: error.stack 
                })
            }),
            { 
                status: 500,
                headers: { "X-Error-Type": "server" } 
            }
        );
    }
}

/**
 * Método GET para buscar candidatos
 */
export async function GET(req) {
    const candidateService = new CandidateService();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    try {
        if (!email) {
            return new Response(
                JSON.stringify({ 
                    success: false,
                    error: "Email parameter is required" 
                }),
                { status: 400 }
            );
        }

        const candidate = await candidateService.findByEmail(email);
        
        return new Response(
            JSON.stringify({ 
                success: true,
                data: candidate 
            }),
            { 
                status: 200,
                headers: { "Content-Type": "application/json" } 
            }
        );

    } catch (error) {
        if (error.message.includes("not found")) {
            return new Response(
                JSON.stringify({ 
                    success: false,
                    error: "Candidate not found" 
                }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ 
                success: false,
                error: "Internal server error" 
            }),
            { status: 500 }
        );
    }
}