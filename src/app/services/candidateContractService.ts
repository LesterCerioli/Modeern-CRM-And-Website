import { CandidateDTO } from "@/domain/dtos/candidateDTO";


export interface CandidateContractService {

  /**
   * Creates a new candidate.
   * @param candidate - Candidate data transfer object (DTO).
   * @returns Promise resolving to the created CandidateDTO.
   */
  create(candidate: CandidateDTO): Promise<CandidateDTO>;

  /**
   * Finds a candidate by email.
   * @param email - Candidate's email.
   * @returns Promise resolving to CandidateDTO.
   * @throws Error if the candidate is not found.
   */
  findByEmail(email: string): Promise<CandidateDTO>;

  

}
