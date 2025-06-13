import fs from "fs/promises";
import path from "path";

const CANDIDATES_JSON_PATH = process.env.CANDIDATES_DATA_PATH || "./tmp/candidatesdata.json";

export class CandidateService {
  private async ensureDataFile(): Promise<void> {
    try {
      await fs.access(CANDIDATES_JSON_PATH);
    } catch {
      await fs.mkdir(path.dirname(CANDIDATES_JSON_PATH), { recursive: true });
      await fs.writeFile(CANDIDATES_JSON_PATH, "[]", "utf8");
    }
  }

  async create(candidate: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    city: string;
    state: string;
    country: string;
    linkedinUrl: string;
  }): Promise<any> {
    await this.ensureDataFile();
    const candidates = await this.readCandidates();

    // Validação de e-mail único
    if (candidates.some(c => c.email === candidate.email)) {
      throw new Error("Candidate with this email already exists");
    }

    const newCandidate = {
      ...candidate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await this.saveCandidates([...candidates, newCandidate]);
    return newCandidate;
  }

  async findByEmail(email: string): Promise<any> {
    const candidates = await this.readCandidates();
    const candidate = candidates.find(c => c.email === email);

    if (!candidate) {
      throw new Error("Candidate not found");
    }

    return candidate;
  }

  private async readCandidates(): Promise<any[]> {
    const data = await fs.readFile(CANDIDATES_JSON_PATH, "utf8");
    return JSON.parse(data);
  }

  private async saveCandidates(candidates: any[]): Promise<void> {
    await fs.writeFile(
      CANDIDATES_JSON_PATH,
      JSON.stringify(candidates, null, 2),
      "utf8"
    );
  }
}
