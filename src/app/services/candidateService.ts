import { CandidateDTO } from "@/domain/dtos/candidateDTO";
import { CandidateContractService } from "./candidateContractService";

import { saveDataCandidates } from "@/app/services/saveDataCandidates";
import { pool } from "@/infrastructure/db/postgres/db";

export class CandidateService implements CandidateContractService {
  /**
   * Saves candidate to both PostgreSQL and JSON in parallel
   */
  async create(candidate: CandidateDTO): Promise<CandidateDTO> {
    try {
      // Executa ambas as operações de persistência em paralelo
      const [dbResult] = await Promise.all([
        this.saveToDatabase(candidate),
        this.saveToJsonFile(candidate).catch(e =>
          console.error("JSON save failed (non-critical):", e)
        )
      ]);

      return dbResult;
    } catch (error) {
      console.error("Create Candidate Error:", error);
      throw new Error("Failed to persist candidate data");
    }
  }

  private async saveToDatabase(candidate: CandidateDTO): Promise<CandidateDTO> {
    const query = `
      INSERT INTO "Candidate"
        (id, "firstName", "lastName", email, telephone, city, state, country, "linkedinUrl", "createdAt", "updatedAt")
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
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
      candidate.linkedinUrl
    ];

    const { rows } = await pool.query(query, values);
    if (!rows.length) throw new Error("Database failed to return created candidate");
    return rows[0];
  }

  private async saveToJsonFile(candidate: CandidateDTO): Promise<void> {
    return saveDataCandidates(candidate);
  }

  async findByEmail(email: string): Promise<CandidateDTO> {
    const query = `SELECT * FROM "Candidate" WHERE email = $1;`;
    const { rows } = await pool.query(query, [email]);
    if (!rows.length) throw new Error("Candidate not found");
    return rows[0];
  }
}
