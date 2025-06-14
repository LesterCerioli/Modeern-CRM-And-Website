import { CandidateService } from '@/app/services/candidateService';
import { StatusCodes } from 'http-status-codes';

export async function POST(req) {
  
  if (!req.body || req.headers.get('content-type') !== 'application/json') {
    return new Response(
      JSON.stringify({ error: "Request body must be JSON" }),
      {
        status: StatusCodes.BAD_REQUEST,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {

    const body = await req.json();
    console.log("Received body data:", body);


    const requiredFields = [
      'firstName', 'lastName', 'email',
      'telephone', 'city', 'state',
      'country', 'linkedinUrl'
    ];

    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields in request body",
          missingFields
        }),
        {
          status: StatusCodes.BAD_REQUEST,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }


    const candidateService = new CandidateService();
    const createdCandidate = await candidateService.create(body);

    return new Response(
      JSON.stringify({
        message: "Candidate created successfully",
        data: createdCandidate
      }),
      {
        status: StatusCodes.CREATED,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {

    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    if (error instanceof SyntaxError) {
      statusCode = StatusCodes.BAD_REQUEST;
      error.message = "Invalid JSON format in request body";
    } else if (error.message.includes("validation")) {
      statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    }

    console.error(`API Error [${statusCode}]:`, error.message);

    return new Response(
      JSON.stringify({
        error: error.message,
        details: statusCode === StatusCodes.INTERNAL_SERVER_ERROR
          ? "Please contact support"
          : undefined
      }),
      {
        status: statusCode,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
