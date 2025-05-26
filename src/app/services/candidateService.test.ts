import { CandidateService } from './candidateService';
import { saveDataCandidates, readDataCandidates } from './saveDataCandidates'; // Actual path
import { CandidateDTO } from '@/domain/dtos/candidateDTO';

// Mock the imported functions from saveDataCandidates.ts
jest.mock('./saveDataCandidates', () => ({
  saveDataCandidates: jest.fn(),
  readDataCandidates: jest.fn(),
}));

describe('CandidateService', () => {
  let candidateService: CandidateService;
  const mockCandidate: CandidateDTO = {
    id: 'test-id-001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    telephone: '1234567890',
    city: 'Testville',
    state: 'TS',
    country: 'US',
    passportId: 'JD12345',
    linkedinUrl: 'https://linkedin.com/in/johndoe',
  };

  beforeEach(() => {
    candidateService = new CandidateService();
    // Reset mocks before each test
    (saveDataCandidates as jest.Mock).mockReset();
    (readDataCandidates as jest.Mock).mockReset();
  });

  describe('create', () => {
    it('should call saveDataCandidates with the candidate data', async () => {
      // Mock saveDataCandidates to resolve successfully (as it's an async-like operation in the service)
      (saveDataCandidates as jest.Mock).mockResolvedValue(undefined); 

      await candidateService.create(mockCandidate);

      expect(saveDataCandidates).toHaveBeenCalledTimes(1);
      expect(saveDataCandidates).toHaveBeenCalledWith(mockCandidate);
    });

    it('should return the candidate data after successful creation', async () => {
      (saveDataCandidates as jest.Mock).mockResolvedValue(undefined);

      const result = await candidateService.create(mockCandidate);

      expect(result).toEqual(mockCandidate);
    });

    it('should throw an error if saveDataCandidates throws an error', async () => {
      const errorMessage = 'Failed to save data';
      (saveDataCandidates as jest.Mock).mockImplementation(() => {
        throw new Error(errorMessage);
      });

      // The service method currently catches the error and throws a generic one.
      // "Error saving candidate data."
      await expect(candidateService.create(mockCandidate))
        .rejects.toThrow('Error saving candidate data.'); 
    });
  });

  describe('getAll', () => {
    it('should call readDataCandidates and return its result', async () => {
      const mockCandidatesList: CandidateDTO[] = [mockCandidate, { ...mockCandidate, id: '002', email: 'jane.doe@example.com' }];
      (readDataCandidates as jest.Mock).mockReturnValue(mockCandidatesList); // readDataCandidates is synchronous

      const result = await candidateService.getAll();

      expect(readDataCandidates).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCandidatesList);
    });

    it('should return an empty array if readDataCandidates returns an empty array', async () => {
      (readDataCandidates as jest.Mock).mockReturnValue([]);

      const result = await candidateService.getAll();

      expect(result).toEqual([]);
    });
    
    it('should throw an error if readDataCandidates throws an error', async () => {
        const errorMessage = 'Failed to read data';
        (readDataCandidates as jest.Mock).mockImplementation(() => {
          throw new Error(errorMessage);
        });
  
        // The service method currently catches the error and throws a new one.
        // "Error retrieving all candidates data."
        await expect(candidateService.getAll())
          .rejects.toThrow('Error retrieving all candidates data.');
      });
  });

  describe('findByEmail', () => {
    it('should throw a "Not Implemented" error', async () => {
      const testEmail = 'test@example.com';
      // The actual error message is "findByEmail is not implemented for JSON storage in this version."
      await expect(candidateService.findByEmail(testEmail))
        .rejects.toThrow('findByEmail is not implemented for JSON storage in this version.');
    });
  });
});
