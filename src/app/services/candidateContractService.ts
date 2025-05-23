import { CandidateDTO } from "@/domain/dtos/candidateDTO";
import { PassportId } from "../shared/passportId";


export interface CandidateContractService {
  create(candidate: CandidateDTO): Promise<CandidateDTO>;

  findByEmail(email: string): Promise<CandidateDTO>;

  findByPassport(passportId: PassportId): Promise<CandidateDTO>;
}
