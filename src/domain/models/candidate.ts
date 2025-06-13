import { v4 as uuidv4 } from 'uuid';


export class Candidate {

    private id: string;
    private firstName: string;
    private lastName: string;
    private email: string;
    private telephone: string;
    private city: string;
    private state: string;
    private country: string;
    private dob: Date;
    private linkedinUrl: string;
    constructor(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        city: string,
        state: string,
        country: string,
        dob: Date,
        linkedinUrl: string




    ) {
        this.id = uuidv4();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.telephone = telephone;
        this.city = city;
        this.state = state;
        this.country = country;
        this.dob = dob;
        this.linkedinUrl = linkedinUrl;
    }
    private static isValidAge(dob: Date): boolean {
        const today = new Date(Date.now()); // 🔹 Always use the current date
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();

        const hasBirthdayPassed =
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

        if (!hasBirthdayPassed) {
            age--;
        }

        return age >= 18;
    }
    /**
     * Returns candidate's age based on dob.
     */
    getAge(): number {
        const today = new Date(Date.now()); // 🔹 Always use the current date
        const birthDate = new Date(this.dob);
        let age = today.getFullYear() - birthDate.getFullYear();

        const hasBirthdayPassed =
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

        if (!hasBirthdayPassed) {
            age--;
        }

        return age;
    }
    static isValidLinkedInUrl(linkedinUrl: string): boolean {
        const linkedInPattern = /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
        return linkedInPattern.test(linkedinUrl);
    }

}
