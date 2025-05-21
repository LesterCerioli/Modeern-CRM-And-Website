import { NextResponse } from 'next/server';
import { z } from 'zod';
import { CandidateService } from '@/services/candidateService';
import candidateService from '../../../../services/candidateService';

const candidateService = new CandidateService();

//function isAuthenticated(request) {
  //const authHeader = request.headers.get('Authorization');
  //return authHeader === 'Bearer my-secret-token';
//}

const DOCUMENT_FORMATS = {
  AE: { pattern: /^[A-Z]{1}[0-9]{7}$/, description: '1 letter + 7 digits', example: 'A1234567' }, // UAE
  AR: { pattern: /^[A-Z]{3}[0-9]{6}$/, description: '3 letters + 6 digits', example: 'ABC123456' },US: { pattern: /^[0-9]{9}$/, description: '9-digit passport number', example: '123456789' },
  AU: { pattern: /^N\d{7}$/, description: 'N + 7 digits', example: 'N1234567' },
  CA: { pattern: /^[A-Z]{2}[0-9]{6}$/, description: '2 letters + 6 digits', example: 'AB123456' },
  CH: { pattern: /^[A-Z]{2}[0-9]{7}$/, description: '2 letters + 7 digits', example: 'AB1234567' },
  CN: { pattern: /^[GE]\d{8}$/, description: 'G/E + 8 digits', example: 'G12345678' }, // China
  DE: { pattern: /^[CFGHJKLMNPRTVWXYZ0-9]{9}$/, description: '9 alphanumeric chars', example: 'C01X000T7' },
  EG: { pattern: /^[A-Z]{1}[0-9]{8}$/, description: '1 letter + 8 digits', example: 'A12345678' }, // Egypt
  ES: { pattern: /^[A-Z]{3}[0-9]{6}$/, description: '3 letters + 6 digits', example: 'ABC123456' },
  FR: { pattern: /^[0-9]{2}[A-Z]{2}[0-9]{5}$/, description: '2 digits + 2 letters + 5 digits', example: '12AB34567' },
  ID: { pattern: /^[A-Z]{1}[0-9]{7,8}$/, description: '1 letter + 7-8 digits', example: 'A1234567' },
  IN: { pattern: /^[A-Z][0-9]{7}$/, description: '1 letter + 7 digits', example: 'A1234567' }, // India
  IT: { pattern: /^[A-Z]{2}[0-9]{7}$/, description: '2 letters + 7 digits', example: 'AB1234567' },
  JP: { pattern: /^[A-Z]{2}[0-9]{7}$/, description: '2 letters + 7 digits', example: 'AB1234567' },
  KE: { pattern: /^[A-Z]{1}[0-9]{7}$/, description: '1 letter + 7 digits', example: 'A1234567' }, // Kenya
  KR: { pattern: /^[A-Z]{1}[0-9]{8}$/, description: '1 letter + 8 digits', example: 'A12345678' },
  NZ: { pattern: /^[A-Z]{1}[0-9]{7}$/, description: '1 letter + 7 digits', example: 'A1234567' },
  NL: { pattern: /^[A-Z]{1}[0-9]{8}$/, description: '1 letter + 8 digits', example: 'A12345678' },
  MX: { pattern: /^[A-Z]{1}[0-9]{8}$/, description: '1 letter + 8 digits', example: 'A12345678' },
  NO: { pattern: /^[A-Z]{2}[0-9]{6}$/, description: '2 letters + 6 digits', example: 'AB123456' },
  NG: { pattern: /^[A-Z]{1}[0-9]{8}$/, description: '1 letter + 8 digits', example: 'A12345678' }, // Nigeria
  PH: { pattern: /^[A-Z]{1}[0-9]{7}$/, description: '1 letter + 7 digits', example: 'A1234567' },
  PL: { pattern: /^[A-Z]{2}[0-9]{7}$/, description: '2 letters + 7 digits', example: 'AB1234567' },
  RU: { pattern: /^[0-9]{9}$/, description: '9-digit passport number', example: '123456789' },
  SE: { pattern: /^[A-Z]{2}[0-9]{6}$/, description: '2 letters + 6 digits', example: 'AB123456' },
  SA: { pattern: /^[A-Z]{1}[0-9]{7}$/, description: '1 letter + 7 digits', example: 'A1234567' }, // Saudi Arabia
  SG: { pattern: /^[A-Z]{1}[0-9]{7}[A-Z]$/, description: '1 letter + 7 digits + 1 letter', example: 'A1234567B' },
  TR: { pattern: /^[A-Z]{2}[0-9]{6}$/, description: '2 letters + 6 digits', example: 'AB123456' },
  TH: { pattern: /^[A-Z]{1}[0-9]{7}$/, description: '1 letter + 7 digits', example: 'A1234567' },
  UK: { pattern: /^[0-9]{9}$/, description: '9-digit passport number', example: '123456789' },
  VN: { pattern: /^[A-Z]{1}[0-9]{7}$/, description: '1 letter + 7 digits', example: 'A1234567' },
  ZA: { pattern: /^[A-Z]{1}[0-9]{8}$/, description: '1 letter + 8 digits', example: 'A12345678' }, // South Africa
  DEFAULT: { pattern: /^[A-Z0-9]{6,12}$/, description: '6-12 alphanumeric', example: 'ABC123' }

};

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(5, 'Phone is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().length(2, 'Country must be ISO 2-letter code'),
  linkedin: z.string().url('Invalid LinkedIn URL').optional(),
  passportId: z.string().optional(),
});

export async function POST(request) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Unauthorized. Missing or invalid token.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = formSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const { passportId, country } = data;

    const allowedCountries = ['US', 'BR', 'IN'];
    if (!allowedCountries.includes(country)) {
      return NextResponse.json(
        { error: `Submission from country ${country} is not allowed.` },
        { status: 403 }
      );
    }

    if (passportId) {
      const format = DOCUMENT_FORMATS[country] || DOCUMENT_FORMATS.DEFAULT;
      if (!format.pattern.test(passportId)) {
        return NextResponse.json(
          {
            error: `Invalid passport format for ${country}. Expected: ${format.description}. Example: ${format.example}`
          },
          { status: 400 }
        );
      }
    }


    await candidateService.create(data);

    return NextResponse.json(
      { message: 'Form submitted successfully', data },
      { status: 200 }
    );

  } catch (error) {
    if (error.message && error.message.includes('not found')) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
