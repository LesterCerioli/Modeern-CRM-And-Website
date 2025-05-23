type CountryCode = string;

export class PassportId {
  private readonly value: string;
  private readonly country: CountryCode;

  constructor(passportId: string, country: CountryCode) {
    const upperCountry = country.toUpperCase();

    if (upperCountry === 'BR') {
      throw new Error('Brazilian passports are not supported.');
    }

    const cleaned = PassportId.clean(passportId);

    if (!PassportId.isValid(cleaned, upperCountry)) {
      throw new Error(`Invalid passport ID for country: ${upperCountry}`);
    }

    this.value = cleaned;
    this.country = upperCountry;
  }

  getValue(): string {
    return this.value;
  }

  getCountry(): string {
    return this.country;
  }

  equals(other: PassportId): boolean {
    return this.value === other.value && this.country === other.country;
  }

  private static clean(input: string): string {
    return input.replace(/\s+/g, '').toUpperCase();
  }

  private static isValid(value: string, country: CountryCode): boolean {
    const patterns: Record<string, RegExp> = {
      US: /^[0-9]{9}$/,                    // United States
      IN: /^[A-Z][0-9]{7}$/,               // India
      FR: /^[0-9]{2}[A-Z]{2}[0-9]{5}$/,    // France
      DE: /^[CFGHJKLMNPRTVWXYZ0-9]{9}$/,   // Germany
      GB: /^[0-9]{9}$/,                    // United Kingdom
      CA: /^[A-Z]{2}[0-9]{6}$/,            // Canada
      AR: /^[A-Z]{3}[0-9]{6}$/,            // Argentina
      CL: /^[A-Z]{2}[0-9]{7}$/,            // Chile
      AU: /^[NPM][0-9]{7}$/,               // Australia
      NZ: /^[A-Z]{2}[0-9]{6}$/,            // New Zealand
      ZA: /^[A-Z]{2}[0-9]{6}$/,            // South Africa
      RU: /^[0-9]{2}[A-Z]{2}[0-9]{6}$/,    // Russia
      CN: /^[GE][0-9]{8}$/,                // China
      JP: /^[A-Z]{2}[0-9]{7}$/,            // Japan
      KR: /^[MSE][0-9]{8}$/,               // South Korea
      SG: /^[A-Z]{1}[0-9]{7}[A-Z]{1}$/,    // Singapore
      MY: /^[A-Z]{2}[0-9]{6}$/,            // Malaysia
      ID: /^[A-C][0-9]{7}$/,               // Indonesia
      TH: /^[A-Z]{1}[0-9]{7}$/,            // Thailand
      VN: /^[A-Z]{2}[0-9]{7}$/,            // Vietnam
      PH: /^[A-Z]{1}[0-9]{7}$/,            // Philippines
      AE: /^[A-Z]{1}[0-9]{7}$/,            // UAE
      SA: /^[A-Z]{2}[0-9]{7}$/,            // Saudi Arabia
      IR: /^[A-Z]{1}[0-9]{8}$/,            // Iran
      TR: /^[A-Z]{2}[0-9]{7}$/,            // Turkey
      EG: /^[A-Z]{1}[0-9]{7}$/,            // Egypt
      NG: /^[A-Z]{1}[0-9]{8}$/,            // Nigeria
      KE: /^[A-Z]{1}[0-9]{7}$/,            // Kenya
      MA: /^[A-Z]{2}[0-9]{6}$/,            // Morocco
      ET: /^[A-Z]{2}[0-9]{6}$/,            // Ethiopia
      MX: /^[A-Z]{1}[0-9]{8}$/,            // Mexico
      CO: /^[A-Z]{3}[0-9]{6}$/,            // Colombia
      PE: /^[A-Z]{2}[0-9]{7}$/,            // Peru
      VE: /^[A-Z]{2}[0-9]{7}$/,            // Venezuela
      ES: /^[A-Z]{3}[0-9]{6}$/,            // Spain
      IT: /^[A-Z]{2}[0-9]{7}$/,            // Italy
      PT: /^[A-Z]{2}[0-9]{6}$/,            // Portugal
      NL: /^[A-Z]{2}[0-9]{6}$/,            // Netherlands
      SE: /^[A-Z]{2}[0-9]{6}$/,            // Sweden
      NO: /^[A-Z]{2}[0-9]{6}$/,            // Norway
      FI: /^[A-Z]{2}[0-9]{6}$/             // Finland
    };

    const regex = patterns[country];
    if (!regex) {
      throw new Error(`Passport validation not implemented for country: ${country}`);
    }

    return regex.test(value);
  }
}
