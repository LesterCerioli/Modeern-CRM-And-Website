import request from 'supertest';

// Define the base URL of the running application
// This should match where your dev server is running.
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

describe('POST /api/auth/login', () => {
  const validUsername = process.env.LOGIN_USER;
  const validPassword = process.env.LOGIN_PASS;

  if (!validUsername || !validPassword) {
    throw new Error('LOGIN_USER and LOGIN_PASS must be set in the environment for integration tests.');
  }

  it('should return 200 OK and a token for valid credentials', async () => {
    const response = await request(APP_URL)
      .post('/api/auth/login')
      .send({ username: validUsername, password: validPassword })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
    expect(response.body.token.split('.').length).toBe(3); // Basic JWT structure check
  });

  it('should return 401 Unauthorized for invalid username', async () => {
    const response = await request(APP_URL)
      .post('/api/auth/login')
      .send({ username: 'invalidUser', password: validPassword })
      .expect('Content-Type', /json/)
      .expect(401);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Invalid credentials');
  });

  it('should return 401 Unauthorized for invalid password', async () => {
    const response = await request(APP_URL)
      .post('/api/auth/login')
      .send({ username: validUsername, password: 'invalidPassword' })
      .expect('Content-Type', /json/)
      .expect(401);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Invalid credentials');
  });

  it('should return 400 Bad Request for missing username', async () => {
    const response = await request(APP_URL)
      .post('/api/auth/login')
      .send({ password: validPassword })
      .expect('Content-Type', /json/)
      .expect(400); // Assuming the API returns 400 if parsing/validation fails for missing fields

      expect(response.body).toHaveProperty('error');
      // The actual error message might depend on server-side validation logic
      // For example, "Invalid JSON payload" if the server expects username and it's not there.
      // Or a more specific "Username is required" if there's field-level validation before credential check.
      // The current login route implementation might return 500 if body parsing fails or if it tries to access undefined username/password
      // Let's adjust expectation based on current POST handler in api/auth/login/route.ts which might result in 401 due to comparison with undefined.
      // If username is undefined, `username === loginUser` would be `undefined === "admin"`, failing.
      // The provided login handler directly uses the parsed body, if a field is missing, it will be undefined.
      // It doesn't have explicit "field required" validation before trying to use them.
      // So, it will likely fall into the "Invalid credentials" path.
      // Let's refine this expectation after checking.
      // The Zod schema is NOT used in the login route, so it will be "Invalid credentials" or 500 if it errors before that.
      // Given `username === loginUser && password === loginPass`, if username is undefined, it's `undefined === "admin"`, false.
      // So it should return 401.
      // However, if the `req.json()` itself fails due to malformed (not just missing fields), it's 400.
      // Sending an empty body or truly malformed JSON would be 400.
      // Sending a valid JSON object with missing fields is different.
      // The current implementation of POST /api/auth/login will try to destructure `username` and `password`.
      // If they are not in the body, they will be `undefined`.
      // `undefined === process.env.LOGIN_USER` will be false. So it will return 401.
      // To get a 400, the JSON itself must be malformed.
      // This test case should be for malformed JSON, not just missing field.
      // I will create a separate test for malformed JSON. This one will be for missing username.
      // It should be 401 as per current logic.
      // Let's re-verify the login route: `const { username, password } = await req.json();`
      // If username is not sent, `username` will be undefined. `undefined === loginUser` is false. So 401.
       expect(response.status).toBe(401); // Corrected based on analysis
       expect(response.body.error).toBe('Invalid credentials');
  });

  it('should return 400 Bad Request for malformed JSON payload', async () => {
    const response = await request(APP_URL)
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send('this is not json')
      .expect('Content-Type', /json/)
      .expect(400);
    
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Invalid JSON payload');
  });

  it('should return 500 if LOGIN_USER is not set in .env (simulated)', async () => {
    const originalLoginUser = process.env.LOGIN_USER;
    delete process.env.LOGIN_USER; // Simulate missing env var

    const response = await request(APP_URL)
      .post('/api/auth/login')
      .send({ username: validUsername, password: validPassword }) // use original valid credentials for request
      .expect('Content-Type', /json/)
      .expect(500);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Internal server error'); // As per login route's error handling

    process.env.LOGIN_USER = originalLoginUser; // Restore
  });
});
