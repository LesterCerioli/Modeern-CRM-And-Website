import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { CandidateDTO } from "@/domain/dtos/candidateDTO"; // Assuming CandidateDTO is the type

dotenv.config();

const candidatesFilePath = process.env.CANDIDATES_DATA_PATH ?? ""; // Ensures it's never undefined

if (!candidatesFilePath) {
    throw new Error("CANDIDATES_DATA_PATH is not defined in environment variables.");
}

/**
 * Saves candidate data to a JSON file.
 * Appends the new candidate to the existing list or creates a new file if it doesn't exist.
 * @param data - The candidate data to save.
 * @throws Error if CANDIDATES_DATA_PATH is not defined or if there's an error during saving.
 */
export function saveDataCandidates(data: CandidateDTO) { // Changed 'any' to 'CandidateDTO' for better type safety
    try {
        console.log("Saving candidate data:", data);

        const dirPath = path.dirname(candidatesFilePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        let candidates: CandidateDTO[] = []; // Use CandidateDTO[] for type safety
        if (fs.existsSync(candidatesFilePath)) {
            const fileContent = fs.readFileSync(candidatesFilePath, "utf8");
            // Ensure fileContent is not empty before parsing
            if (fileContent.trim()) {
                try {
                    candidates = JSON.parse(fileContent) as CandidateDTO[];
                } catch (parseError) {
                    console.error("Error parsing existing candidates file:", parseError);
                    // Decide how to handle: overwrite, throw error, or try to recover
                    // For now, we'll start with an empty list if parsing fails, effectively overwriting corrupted data.
                    // Or, more safely, throw an error:
                    // throw new Error("Failed to parse existing candidates data. Please check the file.");
                }
            }
        }

        candidates.push(data);
        fs.writeFileSync(candidatesFilePath, JSON.stringify(candidates, null, 2), "utf8");

        console.log("Candidate saved successfully!");
    } catch (error) {
        console.error("Error candidate saving:", error);
        // Ensure the error is re-thrown or handled appropriately
        if (error instanceof Error) { // Check if error is an instance of Error
          throw new Error(`Failed saving process: ${error.message}`);
        } else {
          throw new Error("Failed saving process due to an unknown error.");
        }
    }
}

/**
 * Reads candidate data from a JSON file.
 * @returns An array of CandidateDTOs. Returns an empty array if the file doesn't exist,
 *          is empty, or if there's an error during reading/parsing.
 */
export function readDataCandidates(): CandidateDTO[] { // Return type CandidateDTO[]
    try {
        if (!fs.existsSync(candidatesFilePath)) {
            console.log("Candidates file does not exist. Returning empty array.");
            return [];
        }

        const fileContent = fs.readFileSync(candidatesFilePath, "utf8");
        if (!fileContent.trim()) {
            console.log("Candidates file is empty. Returning empty array.");
            return [];
        }

        const data = JSON.parse(fileContent) as CandidateDTO[];
        return data;
    } catch (error) {
        console.error("Error reading or parsing candidates data:", error);
        // In case of an error (e.g., malformed JSON, file read permission issue), return an empty array.
        return [];
    }
}
