import { NextRequest, NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth.utils'; // Assuming your tsconfig paths are set up for @/

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const loginUser = process.env.LOGIN_USER;
    const loginPass = process.env.LOGIN_PASS;

    if (!loginUser || !loginPass) {
      console.error('Login credentials are not set in environment variables.');
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    if (username === loginUser && password === loginPass) {
      // Credentials match, generate a token
      const tokenPayload = { sub: username, role: 'user' };
      const token = await generateToken(tokenPayload, '1h'); // Expires in 1 hour

      return NextResponse.json({ token }, { status: 200 });
    } else {
      // Invalid credentials
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    // Handle cases where request body might be malformed or other unexpected errors
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
