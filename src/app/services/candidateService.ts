import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  city: string;
  state: string;
  country: string;
  linkedinUrl: string;
  createdAt: string;
  updatedAt: string;
}

export class CandidateService {
  private readonly db: Pool;

  constructor() {
    this.db = new Pool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      application_name: 'CandidateService'
      
    });
  }

  async create(candidate: Omit<Candidate, 'id' | 'createdAt' | 'updatedAt'>): Promise<Candidate> {
    const email = candidate.email.toLowerCase();

    const existing = await this.db.query('SELECT * FROM candidates WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      throw new Error('Candidate with this email already exists');
    }

    const id = uuidv4();
    const now = new Date().toISOString();

    await this.db.query(
      `INSERT INTO candidates (
        id, first_name, last_name, email, telephone, city, state, country, linkedin_url, created_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
      )`,
      [
        id,
        candidate.firstName,
        candidate.lastName,
        email,
        candidate.telephone,
        candidate.city,
        candidate.state,
        candidate.country,
        candidate.linkedinUrl,
        now
      ]
    );

    return {
      id,
      ...candidate,
      email,
      createdAt: now,
      updatedAt: now
    };
  }

  async findByEmail(email: string): Promise<Candidate> {
    const result = await this.db.query('SELECT * FROM candidates WHERE email = $1', [email.toLowerCase()]);
    if (result.rows.length === 0) {
      throw new Error('Candidate not found');
    }

    return result.rows[0];
  }

  async update(id: string, updates: Partial<Omit<Candidate, 'id' | 'createdAt'>>): Promise<void> {
    const fields = Object.keys(updates);
    if (fields.length === 0) return;

    const values = Object.values(updates);
    const setClause = fields.map((field, i) => `${field} = $${i + 1}`).join(', ');

    await this.db.query(
      `UPDATE candidates SET ${setClause}, updated_at = $${fields.length + 1} WHERE id = $${fields.length + 2}`,
      [...values, new Date().toISOString(), id]
    );
  }
}
