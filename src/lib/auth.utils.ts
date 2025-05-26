import * as jose from 'jose';

/**
 * Generates a JWT token.
 * @param payload - The payload to include in the token.
 * @param expiresIn - The expiration time for the token (e.g., '1h', '7d'). Defaults to '1h'.
 * @returns The signed JWT string.
 * @throws Error if JWT_SECRET is not set in environment variables.
 */
export async function generateToken(payload: object, expiresIn: string = '1h'): Promise<string> {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set in environment variables.');
  }
  const secretKey = new TextEncoder().encode(secret);
  const alg = 'HS256';

  const jwt = await new jose.SignJWT(payload as unknown as jose.JWTPayload)
    .setProtectedHeader({ alg })
    .setExpirationTime(expiresIn)
    .setIssuedAt()
    .sign(secretKey);

  return jwt;
}

/**
 * Verifies a JWT token.
 * @param token - The JWT string to verify.
 * @returns The decoded payload if verification is successful.
 * @throws Error if JWT_SECRET is not set, or if token verification fails.
 */
export async function verifyToken(token: string): Promise<jose.JWTPayload> {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set in environment variables.');
  }
  const secretKey = new TextEncoder().encode(secret);

  try {
    const { payload } = await jose.jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    // Log the error or handle it as needed
    console.error('Token verification failed:', error);
    throw new Error('Invalid token.');
  }
}
