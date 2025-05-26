require('dotenv').config({ path: '.env' }); 

// Override or set default JWT_SECRET for tests if not present in .env or for consistency
// It's good practice for tests to use a specific, known secret.
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-super-secret-key-for-jest'; 

// Use a test-specific path for candidate data to avoid interfering with actual data.
process.env.CANDIDATES_DATA_PATH_TEST = 'data/test-candidates.json';

// Ensure that the actual CANDIDATES_DATA_PATH used by the application in tests
// points to the test-specific file path.
if (process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID !== undefined) {
  process.env.CANDIDATES_DATA_PATH = process.env.CANDIDATES_DATA_PATH_TEST;
  console.log(`Jest setup: CANDIDATES_DATA_PATH is now set to ${process.env.CANDIDATES_DATA_PATH_TEST}`);
} else {
  // Fallback or warning if not in a test environment but this file is somehow sourced
  console.warn('Jest setup: Not in a recognized test environment. CANDIDATES_DATA_PATH might not be using the test path.');
  // If CANDIDATES_DATA_PATH is not set, and we are not in test, it will use its default from .env or code.
  // We could force it here for safety if this setup file might be used outside Jest.
  // process.env.CANDIDATES_DATA_PATH = process.env.CANDIDATES_DATA_PATH || process.env.CANDIDATES_DATA_PATH_TEST;
}


console.log('Jest setup: JWT_SECRET and CANDIDATES_DATA_PATH_TEST configured for tests.');
console.log(`Jest setup: CANDIDATES_DATA_PATH_TEST is ${process.env.CANDIDATES_DATA_PATH_TEST}`);
console.log(`Jest setup: CANDIDATES_DATA_PATH is ${process.env.CANDIDATES_DATA_PATH}`);

if (!process.env.JWT_SECRET) {
  console.error('Jest setup WARNING: JWT_SECRET is not defined! Auth tests may fail.');
}
if (!process.env.CANDIDATES_DATA_PATH) {
    console.error('Jest setup WARNING: CANDIDATES_DATA_PATH is not defined! Candidate data tests might fail or use default path.');
}
