import { CandidateDTO } from "@/domain/dtos/candidateDTO";
import { CandidateContractService } from "./candidateContractService";
import { saveDataCandidates, readDataCandidates } from "./saveDataCandidates"; // Import readDataCandidates

export class CandidateService implements CandidateContractService {
  /**
   * Creates a new candidate by saving to a JSON file.
   * @param candidate - Candidate data to be saved.
   * @returns Promise resolving to the created CandidateDTO.
   */
  async create(candidate: CandidateDTO): Promise<CandidateDTO> {
    // const query = `
    //   INSERT INTO "Candidate" (
    //     id, "firstName", "lastName", email, telephone, city, state, country, cpf, "linkedinUrl", "createdAt", "updatedAt"
    //   )
    //   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
    //   RETURNING *;
    // `;

    // const values = [
    //   candidate.id,
    //   candidate.firstName,
    //   candidate.lastName,
    //   candidate.email,
    //   candidate.telephone,
    //   candidate.city,
    //   candidate.state,
    //   candidate.country,
    //   candidate.passportId,
    //   candidate.linkedinUrl
    // ];

    try {
      // // const { rows } = await pool.query(query, values);
      // // if (!rows.length) throw new Error("Failed to create candidate");
      // // return rows[0];
      // throw new Error("Database connection is not available in this context.");

      // saveDataCandidates is synchronous, but we're calling it from an async function.
      // If saveDataCandidates were async, we would await it.
      saveDataCandidates(candidate); // Save candidate to JSON file
      return candidate; // Return the input candidate object

    } catch (error) {
      console.error("Error saving candidate data:", error);
      // Consider how to handle errors from saveDataCandidates, e.g., if it throws an error.
      // For now, re-throwing or throwing a more specific error.
      throw new Error("Error saving candidate data.");
    }
  }

  /**
   * Finds a candidate by email. (Currently not implemented for JSON storage)
   * @param email - Candidate email.
   * @returns Promise resolving to CandidateDTO.
   * @throws Error if no candidate is found or method is not implemented.
   */
  async findByEmail(email: string): Promise<CandidateDTO> {
    // const query = `SELECT * FROM "Candidate" WHERE email = $1;`;

    // try {
    //   // const { rows } = await pool.query(query, [email]);
    //   // if (!rows.length) throw new Error("Candidate not found");
    //   // return rows[0];
    //   throw new Error("Database connection is not available in this context.");
    // } catch (error) {
    //   console.error("Database Error (Find by Email):", error);
    //   throw new Error("Database error while retrieving candidate by email.");
    // }
    console.warn(`findByEmail with email: ${email} - Not implemented for JSON storage.`);
    throw new Error("findByEmail is not implemented for JSON storage in this version.");
  }

  /**
   * Retrieves all candidates from the JSON file.
   * @returns Promise resolving to an array of CandidateDTOs.
   */
  async getAll(): Promise<CandidateDTO[]> {
    try {
      // readDataCandidates is synchronous.
      // Making getAll async allows it to fit the Promise<CandidateDTO[]> signature
      // and provides flexibility if readDataCandidates becomes async later.
      const candidates = readDataCandidates();
      return candidates;
    } catch (error) {
      console.error("Error retrieving all candidates:", error);
      // Depending on expected behavior, you might want to return an empty array
      // or re-throw the error. For now, let's re-throw to indicate a problem.
      throw new Error("Error retrieving all candidates data.");
    }
  }
}
