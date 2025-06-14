import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";

dotenv.config();

const candidatesFilePath = process.env.CANDIDATES_DATA_PATH || "./tmp/candidates.json";

export async function saveDataCandidates(data: any): Promise<void> {
  try {

    const dirPath = path.dirname(candidatesFilePath);
    await fs.mkdir(dirPath, { recursive: true }).catch(() => {});


    let candidates = [];
    try {
      const fileContent = await fs.readFile(candidatesFilePath, "utf8");
      candidates = JSON.parse(fileContent);

      if (!Array.isArray(candidates)) {
        console.warn("Existing file content is not an array, creating new array");
        candidates = [];
      }
    } catch (error) {


      if (isNodeError(error) && error.code !== 'ENOENT') {
        console.error("Error reading candidates file:", error);
        throw new Error("Failed to read existing candidate data");
      }
    }


    candidates.push(data);
    await fs.writeFile(
      candidatesFilePath,
      JSON.stringify(candidates, null, 2),
      "utf8"
    );

    console.log("Candidate data saved successfully");
  } catch (error) {
    console.error("Failed to save candidate data:", error);
    throw new Error("Failed to persist candidate data to JSON file");
  }
}


function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && 'code' in error;
}
