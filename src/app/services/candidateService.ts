import { CandidateDTO } from "@/domain/dtos/candidateDTO";
import { CandidateContractService } from "./candidateContractService";
import fs from "fs/promises";
import path from "path";

export class CandidateService implements CandidateContractService {
  private readonly dataPath = path.join(__dirname, '../../data/candidates.json');

  private async ensureDataFile(): Promise<void> {
    try {
      await fs.access(this.dataPath);
    } catch {
      await fs.mkdir(path.dirname(this.dataPath), { recursive: true });
      await fs.writeFile(this.dataPath, '[]', 'utf8');
    }
  }

  private async readCandidates(): Promise<CandidateDTO[]> {
    await this.ensureDataFile();
    const data = await fs.readFile(this.dataPath, 'utf8');
    return JSON.parse(data);
  }

  private async saveCandidates(candidates: CandidateDTO[]): Promise<void> {
    await fs.writeFile(this.dataPath, JSON.stringify(candidates, null, 2), 'utf8');
  }

  async create(candidate: CandidateDTO): Promise<CandidateDTO> {
    const candidates = await this.readCandidates();

    
    if (candidates.some(c => c.email === candidate.email)) {
      throw new Error("Candidate with this email already exists");
    }

    const newCandidate = {
      ...candidate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    candidates.push(newCandidate);
    await this.saveCandidates(candidates);

    return newCandidate;
  }

  async findByEmail(email: string): Promise<CandidateDTO> {
    const candidates = await this.readCandidates();
    const candidate = candidates.find(c => c.email === email);

    if (!candidate) {
      throw new Error("Candidate not found");
    }

    return candidate;
  }
}
