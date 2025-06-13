import { CandidateDTO } from "../dtos/candidateDTO";

export interface CandidateRepositoryContract {
    create(candidate: CandidateDTO): Promise<CandidateDTO>;
    findByEmail(email: string): Promise<CandidateDTO | null>;  // Allow null
    
}
