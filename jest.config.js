module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // To handle aliases like @/lib/auth.utils
  },
  setupFiles: ['<rootDir>/jest.setup.js'] // For setting up .env for tests
};
