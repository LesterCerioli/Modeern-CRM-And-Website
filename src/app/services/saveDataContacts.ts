import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();
const contactsFilePath = process.env.CONTACTS_DATA_PATH;

if (!contactsFilePath) {
    throw new Error("Variável de ambiente CONTACTS_DATA_PATH não está definida.");
}
export const saveContactData = (data: any) => {
    try {

        const dirPath = path.dirname(contactsFilePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }


        let contacts = [];
        if (fs.existsSync(contactsFilePath)) {
            const fileContent = fs.readFileSync(contactsFilePath, "utf8");
            contacts = fileContent ? JSON.parse(fileContent) : [];
        }


        contacts.push(data);


        fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2), "utf8");

        console.log("Contato salvo com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar contato:", error);
        throw new Error("Falha ao salvar os dados do contato.");
    }
};
