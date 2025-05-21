import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const candidatesFilePath = process.env.CANDIDATES_DATA_PATH ?? ""; // Ensures it's never undefined

if (!candidatesFilePath) {
    throw new Error("CANDIDATES_DATA_PATH is not defined in environment variables.");
}

export function saveDataCandidates(data: any) {
    try {
        console.log("Saving candidate data:", data);

        const dirPath = path.dirname(candidatesFilePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        let candidates = [];
        if (fs.existsSync(candidatesFilePath)) {
            const fileContent = fs.readFileSync(candidatesFilePath, "utf8");
            candidates = fileContent ? JSON.parse(fileContent) : [];
        }

        candidates.push(data);
        fs.writeFileSync(candidatesFilePath, JSON.stringify(candidates, null, 2), "utf8");

        console.log("Candidate saved successfully!");
    } catch (error) {
        console.error("Error saving candidate.:", error);
        throw new Error("Failling saving candidate data.");
    }
}
