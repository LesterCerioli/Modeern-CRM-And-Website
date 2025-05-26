import { generateToken, verifyToken } from './auth.utils';
import * as jose from 'jose';

describe('Auth Utils', () => {
  const testPayload = { userId: 'testUser123', role: 'user' };
  const testSecret = process.env.JWT_SECRET as string;

  if (!testSecret) {
    throw new Error('JWT_SECRET is not defined. Make sure it is set in jest.setup.js or .env file for tests.');
  }

  describe('generateToken', () => {
    it('should generate a valid JWT token string', async () => {
      const token = await generateToken(testPayload, '1m'); // 1 minute expiration for test
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3); // Basic check for JWT structure
    });

    it('should embed the correct payload into the token', async () => {
      const token = await generateToken(testPayload, '1m');
      const decodedPayload = await verifyToken(token); // Use our own verifyToken to check

      // Remove 'iat' and 'exp' for comparison as they are auto-generated
      const { iat, exp, ...payloadToCompare } = decodedPayload;
      expect(payloadToCompare).toEqual(testPayload);
    });

    it('should throw an error if JWT_SECRET is not set (simulated by temporarily unsetting)', async () => {
      const originalSecret = process.env.JWT_SECRET;
      delete process.env.JWT_SECRET; // Simulate missing secret
      
      await expect(generateToken(testPayload, '1m')).rejects.toThrow('JWT_SECRET is not set in environment variables.');
      
      process.env.JWT_SECRET = originalSecret; // Restore secret
    });
  });

  describe('verifyToken', () => {
    let validToken: string;

    beforeAll(async () => {
      validToken = await generateToken(testPayload, '5m'); // Generate a token valid for 5 minutes
    });

    it('should verify a valid token and return the payload', async () => {
      const decodedPayload = await verifyToken(validToken);
      const { iat, exp, ...payloadToCompare } = decodedPayload;
      expect(payloadToCompare).toEqual(testPayload);
    });

    it('should throw an error for an invalid token (malformed)', async () => {
      const malformedToken = 'this.is.not.a.valid.token';
      await expect(verifyToken(malformedToken)).rejects.toThrow('Invalid token.');
    });

    it('should throw an error for a token signed with a different secret', async () => {
      const anotherSecret = new TextEncoder().encode('another-super-secret-key-for-jest-different');
      const tokenWithDifferentSecret = await new jose.SignJWT(testPayload as unknown as jose.JWTPayload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1m')
        .sign(anotherSecret);
      
      await expect(verifyToken(tokenWithDifferentSecret)).rejects.toThrow('Invalid token.');
    });
    
    it('should throw an error for an expired token', async () => {
      // Generate a token that expires very quickly (e.g., 1 millisecond)
      const expiredToken = await generateToken(testPayload, '1ms');
      
      // Wait for a moment to ensure the token has expired
      await new Promise(resolve => setTimeout(resolve, 50)); // Wait 50ms

      await expect(verifyToken(expiredToken)).rejects.toThrow('Invalid token.');
    });

    it('should throw an error if JWT_SECRET is not set for verification (simulated)', async () => {
        const originalSecret = process.env.JWT_SECRET;
        delete process.env.JWT_SECRET; // Simulate missing secret
        
        // We need a token to test verification against
        // Re-generate with the original secret before deleting it for the verifyToken call
        process.env.JWT_SECRET = originalSecret; 
        const tokenToTest = await generateToken(testPayload, '1m');
        delete process.env.JWT_SECRET; // Now delete it for the verifyToken call

        await expect(verifyToken(tokenToTest)).rejects.toThrow('JWT_SECRET is not set in environment variables.');
        
        process.env.JWT_SECRET = originalSecret; // Restore secret
      });
  });
});
