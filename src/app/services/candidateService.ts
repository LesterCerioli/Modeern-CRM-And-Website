import { Client } from "@elastic/elasticsearch";
import * as dotenv from 'dotenv';

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
  private readonly esClient: Client;
  private readonly indexName: string;

  constructor() {
    if (!process.env.ELASTICSEARCH_CLOUD_URL || !process.env.ELASTICSEARCH_API_KEY || !process.env.ELASTICSEARCH_INDEX) {
      throw new Error('Missing Elasticsearch configuration in .env');
    }

    this.esClient = new Client({
      node: process.env.ELASTICSEARCH_CLOUD_URL,
      auth: { apiKey: process.env.ELASTICSEARCH_API_KEY },
      maxRetries: 3,
      requestTimeout: 30000
    });
    this.indexName = process.env.ELASTICSEARCH_INDEX;
  }

  private async ensureIndexExists(): Promise<void> {
    const exists = await this.esClient.indices.exists({ index: this.indexName });
    if (!exists) {
      await this.esClient.indices.create({
        index: this.indexName,
        mappings: {
          properties: {
            id: { type: 'keyword' },
            firstName: { type: 'text' },
            lastName: { type: 'text' },
            email: { type: 'keyword' },
            telephone: { type: 'keyword' },
            city: { type: 'text' },
            state: { type: 'keyword' },
            country: { type: 'keyword' },
            linkedinUrl: { type: 'keyword' },
            createdAt: { type: 'date' },
            updatedAt: { type: 'date' }
          }
        }
      });
    }
  }

  async create(candidate: Omit<Candidate, 'createdAt' | 'updatedAt'>): Promise<Candidate> {
    await this.ensureIndexExists();
    
    const { hits } = await this.esClient.search<Candidate>({
      index: this.indexName,
      query: { term: { email: candidate.email.toLowerCase() } }
    });

    if (hits.hits.length > 0) {
      throw new Error("Candidate with this email already exists");
    }

    const now = new Date().toISOString();
    const newCandidate: Candidate = {
      ...candidate,
      email: candidate.email.toLowerCase(),
      createdAt: now,
      updatedAt: now
    };

    const { _id } = await this.esClient.index({
      index: this.indexName,
      document: newCandidate,
      refresh: true
    });

    return { ...newCandidate, id: _id };
  }

  async findByEmail(email: string): Promise<Candidate> {
    const { hits } = await this.esClient.search<Candidate>({
      index: this.indexName,
      query: { term: { email: email.toLowerCase() } }
    });

    if (hits.hits.length === 0) {
      throw new Error("Candidate not found");
    }

    return hits.hits[0]._source!;
  }

  async update(id: string, updates: Partial<Omit<Candidate, 'id' | 'createdAt'>>): Promise<void> {
    await this.esClient.update({
      index: this.indexName,
      id,
      doc: {
        ...updates,
        updatedAt: new Date().toISOString()
      },
      refresh: true
    });
  }
}