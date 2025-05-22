import { CandidateDTO } from "@/domain/dtos/candidateDTO";

export class CandidateService implements CandidateContractService {

  /**
   * Creates a new candidate in the database.
   * @param candidate - Candidate data to be inserted.
   * @returns Promise resolving to the created CandidateDTO.
   */
  async create(candidate: CandidateDTO): Promise<CandidateDTO> {
    const query = `
      INSERT INTO "Candidate" (id, "firstName", "lastName", email, telephone, city, state, country, cpf, "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
      RETURNING *;
    `;

    const values = [
      candidate.id,
      candidate.firstName,
      candidate.lastName,
      candidate.email,
      candidate.telephone,
      candidate.city,
      candidate.state,
      candidate.country,
      candidate.passportId
    ];

    try {
      const { rows } = await pool.query(query, values);
      if (!rows.length) throw new Error("Failed to create candidate");

      return rows[0];
    } catch (error) {
      console.error("Database Error (Create Candidate):", error);
      throw new Error("Database error while creating candidate.");
    }
  }

  /**
   * Finds a candidate by email.
   * @param email - Candidate email.
   * @returns Promise resolving to CandidateDTO.
   * @throws Error if no candidate is found.
   */
  async findByEmail(email: string): Promise<CandidateDTO> {
    const query = `SELECT * FROM "Candidate" WHERE email = $1;`;

    try {
      const { rows } = await pool.query(query, [email]);
      if (!rows.length) throw new Error("Candidate not found");

      return rows[0];
    } catch (error) {
      console.error("Database Error (Find by Email):", error);
      throw new Error("Database error while retrieving candidate by email.");
    }
  }


  
}
