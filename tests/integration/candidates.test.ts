import request from 'supertest';
import fs from 'fs';
import path from 'path';
import { CandidateDTO } from '@/domain/dtos/candidateDTO'; // Adjust path as necessary

// Define the base URL of the running application
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

// Define the path for the test candidates JSON file
const TEST_CANDIDATES_FILE_PATH = process.env.CANDIDATES_DATA_PATH_TEST as string;

if (!TEST_CANDIDATES_FILE_PATH) {
  throw new Error('CANDIDATES_DATA_PATH_TEST environment variable must be set for integration tests.');
}

// Ensure the directory for the test file exists
const testDataDir = path.dirname(TEST_CANDIDATES_FILE_PATH);
if (!fs.existsSync(testDataDir)) {
  fs.mkdirSync(testDataDir, { recursive: true });
}

// Helper function to clear the test candidates file
const clearTestCandidatesFile = () => {
  if (fs.existsSync(TEST_CANDIDATES_FILE_PATH)) {
    fs.writeFileSync(TEST_CANDIDATES_FILE_PATH, JSON.stringify([]), 'utf8');
  }
};

// Helper function to get a valid token
const getAuthToken = async (): Promise<string> => {
  const username = process.env.LOGIN_USER;
  const password = process.env.LOGIN_PASS;

  if (!username || !password) {
    throw new Error('LOGIN_USER and LOGIN_PASS must be set in the environment.');
  }

  const response = await request(APP_URL)
    .post('/api/auth/login')
    .send({ username, password });
  
  if (!response.body.token) {
    throw new Error('Failed to obtain token for tests. Login response: ' + JSON.stringify(response.body));
  }
  return response.body.token;
};

const sampleCandidatePayload: Omit<CandidateDTO, 'id' | 'createdAt' | 'updatedAt'> = {
  firstName: 'IntegrationTest',
  lastName: 'User',
  email: 'integration.test.user@example.com',
  telephone: '09876543211',
  city: 'Testopolis',
  state: 'IT',
  country: 'US', // Allowed country
  passportId: 'ITEST12345',
  linkedinUrl: 'https://www.linkedin.com/in/integrationtestuser/',
};


describe('Candidates API (/api/candidates)', () => {
  let validToken: string;

  beforeAll(async () => {
    // Obtain a valid token once for all tests in this suite
    try {
        validToken = await getAuthToken();
    } catch (error) {
        console.error("Failed to get auth token in beforeAll:", error);
        // Exiting or forcing failure if token is essential for all tests
        process.exit(1); 
    }
  });

  beforeEach(() => {
    // Clear the test candidates file before each test to ensure independence
    clearTestCandidatesFile();
  });

  afterAll(() => {
    // Optional: Clear the test candidates file after all tests if desired
    clearTestCandidatesFile();
  });

  describe('POST /api/candidates', () => {
    it('should return 401 Unauthorized if no token is provided', async () => {
      await request(APP_URL)
        .post('/api/candidates')
        .send(sampleCandidatePayload)
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it('should return 401 Unauthorized if an invalid token is provided', async () => {
      await request(APP_URL)
        .post('/api/candidates')
        .set('Authorization', 'Bearer aninvalidtoken123')
        .send(sampleCandidatePayload)
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it('should return 200 OK and success message for valid data with a valid token', async () => {
      const response = await request(APP_URL)
        .post('/api/candidates')
        .set('Authorization', `Bearer ${validToken}`)
        .send(sampleCandidatePayload)
        .expect('Content-Type', /json/)
        .expect(200); // The API returns 200 on successful POST

      expect(response.body).toHaveProperty('message', 'Form submitted successfully');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.email).toBe(sampleCandidatePayload.email);

      // Verify data was written to the test file
      const fileContents = fs.readFileSync(TEST_CANDIDATES_FILE_PATH, 'utf8');
      const candidatesInFile: CandidateDTO[] = JSON.parse(fileContents);
      expect(candidatesInFile.length).toBe(1);
      expect(candidatesInFile[0].email).toBe(sampleCandidatePayload.email);
    });

    it('should return 400 Bad Request for invalid data (e.g., missing required field)', async () => {
      const invalidPayload = { ...sampleCandidatePayload, email: undefined }; // Missing email
      const response = await request(APP_URL)
        .post('/api/candidates')
        .set('Authorization', `Bearer ${validToken}`)
        .send(invalidPayload)
        .expect('Content-Type', /json/)
        .expect(400);
      
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toHaveProperty('email'); // Zod error messages
    });
  });

  describe('GET /api/candidates', () => {
    it('should return 401 Unauthorized if no token is provided', async () => {
      await request(APP_URL)
        .get('/api/candidates')
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it('should return 401 Unauthorized if an invalid token is provided', async () => {
      await request(APP_URL)
        .get('/api/candidates')
        .set('Authorization', 'Bearer aninvalidtoken123')
        .expect('Content-Type', /json/)
        .expect(401);
    });

    it('should return 200 OK and an array of candidates with a valid token', async () => {
      // First, add a candidate to ensure there's data to retrieve
      await request(APP_URL)
        .post('/api/candidates')
        .set('Authorization', `Bearer ${validToken}`)
        .send(sampleCandidatePayload);

      const response = await request(APP_URL)
        .get('/api/candidates')
        .set('Authorization', `Bearer ${validToken}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('candidates');
      expect(Array.isArray(response.body.candidates)).toBe(true);
      expect(response.body.candidates.length).toBeGreaterThanOrEqual(1);
      expect(response.body.candidates.some((c: CandidateDTO) => c.email === sampleCandidatePayload.email)).toBe(true);
    });

    it('should return an empty array if no candidates have been added', async () => {
        // File is cleared in beforeEach
        const response = await request(APP_URL)
          .get('/api/candidates')
          .set('Authorization', `Bearer ${validToken}`)
          .expect('Content-Type', /json/)
          .expect(200);
  
        expect(response.body).toHaveProperty('candidates');
        expect(Array.isArray(response.body.candidates)).toBe(true);
        expect(response.body.candidates.length).toBe(0);
      });
  });
});
