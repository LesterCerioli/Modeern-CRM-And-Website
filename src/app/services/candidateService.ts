
import { CandidateContractService } from "./candidateContractService";
import { CandidateDTO } from "@/domain/dtos/candidateDTO";
import { saveDataCandidates } from "./saveDataCandidates";

import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const candidatesFilePath = process.env.CANDIDATES_DATA_PATH ?? "";

if (!candidatesFilePath) {
  throw new Error("CANDIDATES_DATA_PATH is not defined in environment variables.");
}

export class CandidateService implements CandidateContractService {
  /**
   * Asynchronously creates a new candidate by saving to a JSON file in background.
   * @param candidate - Candidate data to be inserted.
   * @returns The input CandidateDTO.
   */
  async create(candidate: CandidateDTO): Promise<CandidateDTO> {
    
    setImmediate(() => {
      try {
        console.log(`[CandidateService] Saving candidate ${candidate.email}...`);
        saveDataCandidates(candidate);
        console.log(`[CandidateService] Candidate ${candidate.email} saved successfully.`);
      } catch (error) {
        console.error(`[CandidateService] Error saving candidate ${candidate.email}:`, error);
      }
    });

    return candidate;
  }

  /**
   * Finds a candidate by email by reading from the JSON file.
   * @param email - Candidate email.
   * @returns Promise resolving to CandidateDTO.
   */
  async findByEmail(email: string): Promise<CandidateDTO> {
    try {
      if (!fs.existsSync(candidatesFilePath)) {
        console.warn("[CandidateService] Candidates file does not exist.");
        throw new Error("Candidates file not found.");
      }

      const fileContent = fs.readFileSync(candidatesFilePath, "utf8");
      const candidates: CandidateDTO[] = fileContent ? JSON.parse(fileContent) : [];

      const candidate = candidates.find((c) => c.email === email);

      if (!candidate) {
        console.warn(`[CandidateService] Candidate not found for email: ${email}`);
        throw new Error("Candidate not found.");
      }

      console.log(`[CandidateService] Candidate ${email} found.`);
      return candidate;
    } catch (error) {
      console.error(`[CandidateService] Error reading candidate for ${email}:`, error);
      throw new Error("Error retrieving candidate data.");
    }
  }
}
