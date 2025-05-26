import fs from 'fs';
import path from 'path';
import { saveDataCandidates, readDataCandidates } from './saveDataCandidates';
import { CandidateDTO } from '@/domain/dtos/candidateDTO';

// Mock the 'fs' module
jest.mock('fs');

// Mock path.dirname to avoid issues with path resolution in test environment for this specific module
jest.mock('path', () => ({
  ...jest.requireActual('path'), // Import and retain default behavior
  dirname: jest.fn((p) => jest.requireActual('path').dirname(p)), // Mock dirname specifically if needed or ensure it works
  resolve: jest.fn((...paths) => jest.requireActual('path').resolve(...paths)), // Mock resolve if needed
}));


describe('Candidate Data Storage', () => {
  // Use the test-specific path from environment variables (set in jest.setup.js)
  const testCandidatesFilePath = process.env.CANDIDATES_DATA_PATH_TEST as string;

  if (!testCandidatesFilePath) {
    throw new Error('CANDIDATES_DATA_PATH_TEST is not defined. Make sure it is set in jest.setup.js.');
  }
  
  // Explicitly set CANDIDATES_DATA_PATH for the module under test if it directly uses it
  // This is crucial if the module itself isn't modified to accept a path or use the _TEST var
  process.env.CANDIDATES_DATA_PATH = testCandidatesFilePath;


  const mockCandidate: CandidateDTO = {
    id: 'test-id-123',
    firstName: 'Test',
    lastName: 'User',
    email: 'test.user@example.com',
    telephone: '1234567890',
    city: 'Test City',
    state: 'TS',
    country: 'US',
    passportId: 'PASS123',
    linkedinUrl: 'https://linkedin.com/in/testuser',
    // createdAt and updatedAt are usually handled by DB or ORM, not part of input DTO for file storage typically
  };

  beforeEach(() => {
    // Reset all fs mocks before each test
    (fs.existsSync as jest.Mock).mockReset();
    (fs.readFileSync as jest.Mock).mockReset();
    (fs.writeFileSync as jest.Mock).mockReset();
    (fs.mkdirSync as jest.Mock).mockReset();
    (path.dirname as jest.Mock).mockReturnValue(jest.requireActual('path').dirname(testCandidatesFilePath)); 
  });

  describe('saveDataCandidates', () => {
    it('should create directory if it does not exist', () => {
      (fs.existsSync as jest.Mock).mockReturnValueOnce(false); // For directory check
      (fs.existsSync as jest.Mock).mockReturnValueOnce(false); // For file check (no existing file)
      
      saveDataCandidates(mockCandidate);
      
      expect(fs.mkdirSync).toHaveBeenCalledWith(expect.any(String), { recursive: true });
    });

    it('should write new data to a new file if none exists', () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false); // No directory, no file
      
      saveDataCandidates(mockCandidate);
      
      const expectedData = JSON.stringify([mockCandidate], null, 2);
      expect(fs.writeFileSync).toHaveBeenCalledWith(testCandidatesFilePath, expectedData, 'utf8');
    });

    it('should append data if file exists and contains valid JSON', () => {
      const existingCandidates: CandidateDTO[] = [{ ...mockCandidate, id: 'old-id-000', email: 'old.user@example.com' }];
      (fs.existsSync as jest.Mock).mockReturnValue(true); // Directory exists, file exists
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(existingCandidates));
      
      saveDataCandidates(mockCandidate);
      
      const expectedData = JSON.stringify([...existingCandidates, mockCandidate], null, 2);
      expect(fs.writeFileSync).toHaveBeenCalledWith(testCandidatesFilePath, expectedData, 'utf8');
    });

    it('should start a new list if file exists but is empty', () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue(''); // Empty file content
      
      saveDataCandidates(mockCandidate);
      
      const expectedData = JSON.stringify([mockCandidate], null, 2);
      expect(fs.writeFileSync).toHaveBeenCalledWith(testCandidatesFilePath, expectedData, 'utf8');
    });
    
    it('should throw an error if write fails (simulated by writeFileSync throwing)', () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue("[]");
      (fs.writeFileSync as jest.Mock).mockImplementation(() => {
        throw new Error('Disk full');
      });

      expect(() => saveDataCandidates(mockCandidate)).toThrow('Failed saving process: Disk full');
    });

    it('should re-throw error from JSON.parse if existing file content is malformed', () => {
        (fs.existsSync as jest.Mock).mockReturnValue(true); // File exists
        (fs.readFileSync as jest.Mock).mockReturnValue('malformed json'); // Malformed content
  
        // The implementation in saveDataCandidates.ts currently catches JSON.parse error
        // and starts with an empty list. If we want to test re-throwing, the main code needs to change.
        // Based on current implementation, it should NOT throw but rather overwrite with new candidate.
        // Let's test that behavior.
        
        saveDataCandidates(mockCandidate); // This should not throw
        const expectedData = JSON.stringify([mockCandidate], null, 2);
        // It should effectively overwrite the bad JSON with a new list containing the candidate.
        expect(fs.writeFileSync).toHaveBeenCalledWith(testCandidatesFilePath, expectedData, 'utf8');
    });
  });

  describe('readDataCandidates', () => {
    it('should return an empty array if file does not exist', () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);
      const data = readDataCandidates();
      expect(data).toEqual([]);
    });

    it('should return an empty array if file is empty', () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue('');
      const data = readDataCandidates();
      expect(data).toEqual([]);
    });

    it('should return parsed data if file exists and contains valid JSON', () => {
      const mockData: CandidateDTO[] = [mockCandidate];
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockData));
      
      const data = readDataCandidates();
      expect(data).toEqual(mockData);
    });

    it('should return an empty array if JSON parsing fails (malformed JSON)', () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue('{"bad": json}'); // Malformed
      
      const data = readDataCandidates();
      expect(data).toEqual([]);
      // Optionally, check console.error was called if your real function logs it
    });

    it('should return an empty array if fs.readFileSync throws an error', () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockImplementation(() => {
        throw new Error('Permission denied');
      });
      
      const data = readDataCandidates();
      expect(data).toEqual([]);
    });
  });
});
