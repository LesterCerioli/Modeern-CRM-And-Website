"use client";

import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { GoIssueClosed } from "react-icons/go";
import { FieldError, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "react-modal";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";


const DOCUMENT_FORMATS: Record<string, {
  pattern: RegExp,
  description: string,
  example: string
}> = {
  // Americas
  US: { pattern: /^[0-9]{9}$/, description: '9-digit passport number', example: '123456789' },
  CA: { pattern: /^[A-Z]{2}[0-9]{6}$/, description: '2 letters + 6 digits', example: 'AB123456' },
  MX: { pattern: /^[A-Z]{1}[0-9]{8}$/, description: '1 letter + 8 digits', example: 'A12345678' },
  AR: { pattern: /^[A-Z]{3}[0-9]{6}$/, description: '3 letters + 6 digits', example: 'ABC123456' },
  BR: { pattern: /^[A-Z]{2}[0-9]{6}$/, description: '2 letters + 6 digits', example: 'AB123456' },
  UK: { pattern: /^[0-9]{9}$/, description: '9-digit passport number', example: '123456789' },
  DE: { pattern: /^[CFGHJKLMNPRTVWXYZ0-9]{9}$/, description: '9 alphanumeric chars', example: 'C01X000T7' },
  FR: { pattern: /^[0-9]{2}[A-Z]{2}[0-9]{5}$/, description: '2 digits + 2 letters + 5 digits', example: '12AB34567' },
  IT: { pattern: /^[A-Z]{2}[0-9]{7}$/, description: '2 letters + 7 digits', example: 'AB1234567' },
  ES: { pattern: /^[A-Z]{3}[0-9]{6}$/, description: '3 letters + 6 digits', example: 'ABC123456' },
  NL: { pattern: /^[A-Z]{1}[0-9]{8}$/, description: '1 letter + 8 digits', example: 'A12345678' },
  CH: { pattern: /^[A-Z]{2}[0-9]{7}$/, description: '2 letters + 7 digits', example: 'AB1234567' },
  SE: { pattern: /^[A-Z]{2}[0-9]{6}$/, description: '2 letters + 6 digits', example: 'AB123456' },
  NO: { pattern: /^[A-Z]{2}[0-9]{6}$/, description: '2 letters + 6 digits', example: 'AB123456' },
  RU: { pattern: /^[0-9]{9}$/, description: '9-digit passport number', example: '123456789' },
  PL: { pattern: /^[A-Z]{2}[0-9]{7}$/, description: '2 letters + 7 digits', example: 'AB1234567' },
  IN: { pattern: /^[A-Z][0-9]{7}$/, description: '1 letter + 7 digits', example: 'A1234567' }, // India
  CN: { pattern: /^[GE]\d{8}$/, description: 'G/E + 8 digits', example: 'G12345678' }, // China
  JP: { pattern: /^[A-Z]{2}[0-9]{7}$/, description: '2 letters + 7 digits', example: 'AB1234567' },
  KR: { pattern: /^[A-Z]{1}[0-9]{8}$/, description: '1 letter + 8 digits', example: 'A12345678' },
  SG: { pattern: /^[A-Z]{1}[0-9]{7}[A-Z]$/, description: '1 letter + 7 digits + 1 letter', example: 'A1234567B' },
  TH: { pattern: /^[A-Z]{1}[0-9]{7}$/, description: '1 letter + 7 digits', example: 'A1234567' },
  ID: { pattern: /^[A-Z]{1}[0-9]{7,8}$/, description: '1 letter + 7-8 digits', example: 'A1234567' },
  PH: { pattern: /^[A-Z]{1}[0-9]{7}$/, description: '1 letter + 7 digits', example: 'A1234567' },
  VN: { pattern: /^[A-Z]{1}[0-9]{7}$/, description: '1 letter + 7 digits', example: 'A1234567' },
  AE: { pattern: /^[A-Z]{1}[0-9]{7}$/, description: '1 letter + 7 digits', example: 'A1234567' }, // UAE
  SA: { pattern: /^[A-Z]{1}[0-9]{7}$/, description: '1 letter + 7 digits', example: 'A1234567' }, // Saudi Arabia
  TR: { pattern: /^[A-Z]{2}[0-9]{6}$/, description: '2 letters + 6 digits', example: 'AB123456' },
  ZA: { pattern: /^[A-Z]{1}[0-9]{8}$/, description: '1 letter + 8 digits', example: 'A12345678' }, // South Africa
  NG: { pattern: /^[A-Z]{1}[0-9]{8}$/, description: '1 letter + 8 digits', example: 'A12345678' }, // Nigeria
  EG: { pattern: /^[A-Z]{1}[0-9]{8}$/, description: '1 letter + 8 digits', example: 'A12345678' }, // Egypt
  KE: { pattern: /^[A-Z]{1}[0-9]{7}$/, description: '1 letter + 7 digits', example: 'A1234567' }, // Kenya
  AU: { pattern: /^N\d{7}$/, description: 'N + 7 digits', example: 'N1234567' },
  NZ: { pattern: /^[A-Z]{1}[0-9]{7}$/, description: '1 letter + 7 digits', example: 'A1234567' },

  DEFAULT: {
    pattern: /^[A-Z0-9]{6,12}$/,
    description: '6-12 alphanumeric characters',
    example: 'ABC123'
  }
};

const schemaForm = z.object({
  dataClient: z.object({
    firstName: z.string().min(3, "Enter your first name"),
    lastName: z.string().min(3, "Enter your last name"),
    email: z.string().email("Invalid email").min(6, "Enter your email"),
    telephone: z.string().min(11, "Enter your phone number"),
    city: z.string().min(3, "Enter your city name"),
    state: z.string().min(2, "Enter your state name"),
    country: z.string().min(2, "Enter country code (e.g., US, IN)"),
    passportId: z.string().min(3, "Enter your document number"),
    linkedinUrl: z.string()
      .url("Enter a valid URL")
      .regex(
        /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/,
        "Invalid URL. Example: https://www.linkedin.com/in/your-name/"
      ),
  }),
}).superRefine((data, ctx) => {
  const countryCode = data.dataClient.country.toUpperCase();
  const documentNumber = data.dataClient.passportId;

  const format = DOCUMENT_FORMATS[countryCode] || DOCUMENT_FORMATS.DEFAULT;

  if (!format.pattern.test(documentNumber)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Invalid document format for ${countryCode}. Expected: ${format.description} (e.g., ${format.example})`,
      path: ["dataClient", "passportId"],
    });
  }
});

type FormProps = z.infer<typeof schemaForm>;

export default function Form() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [documentFormatHint, setDocumentFormatHint] = useState<string>("");

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    control
  } = useForm<FormProps>({
    resolver: zodResolver(schemaForm),
    mode: "all",
    defaultValues: {
      dataClient: {
        firstName: "",
        lastName: "",
        email: "",
        telephone: "",
        city: "",
        state: "",
        country: "",
        passportId: "",
        linkedinUrl: "",
      },
    },
  });

  const countryValue = useWatch({
    control,
    name: "dataClient.country",
  });

  useEffect(() => {
    if (countryValue) {
      const countryCode = countryValue.toUpperCase();
      const format = DOCUMENT_FORMATS[countryCode] || DOCUMENT_FORMATS.DEFAULT;
      setDocumentFormatHint(`Expected format: ${format.description} (e.g., ${format.example})`);
    } else {
      setDocumentFormatHint("");
    }
  }, [countryValue]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    reset();
  };

  const handleFormSubmit = async (data: FormProps) => {
    setIsSending(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_API_CANDIDATES}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.dataClient),
      });

      const result = await response.json();
      if (response.ok) {
        openModal();
        setFormMessage("✅ Your application was submitted successfully!");
        setTimeout(closeModal, 2000);
      } else {
        setFormMessage(result.error || "❌ Error submitting application.");
      }
    } catch (error) {
      console.error("🚨 Error:", error);
      setFormMessage("❌ Error connecting to server.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <S.Container>
      <SpeedInsights />
      <Analytics />
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <S.Title>
          <h1>Register for our job openings</h1>
          <label className="line"></label>
        </S.Title>

        <S.Data>
          <input {...register("dataClient.firstName")} placeholder="First Name" required />
          {errors.dataClient?.firstName && <p className="error">{errors.dataClient.firstName.message}</p>}

          <input {...register("dataClient.lastName")} placeholder="Last Name" required />
          {errors.dataClient?.lastName && <p className="error">{errors.dataClient.lastName.message}</p>}

          <input {...register("dataClient.email")} type="email" placeholder="Email" required />
          {errors.dataClient?.email && <p className="error">{errors.dataClient.email.message}</p>}

          <input {...register("dataClient.telephone")} placeholder="Phone" required />
          {errors.dataClient?.telephone && <p className="error">{errors.dataClient.telephone.message}</p>}

          <input {...register("dataClient.city")} placeholder="City" required />
          {errors.dataClient?.city && <p className="error">{errors.dataClient.city.message}</p>}

          <input {...register("dataClient.state")} placeholder="State" required />
          {errors.dataClient?.state && <p className="error">{errors.dataClient.state.message}</p>}

          <input
            {...register("dataClient.country")}
            placeholder="Country Code (e.g., US, IN)"
            list="countryCodes"
            required
          />
          <datalist id="countryCodes">
            {Object.keys(DOCUMENT_FORMATS)
              .filter(code => code !== 'DEFAULT')
              .map(code => (
                <option key={code} value={code} />
              ))}
          </datalist>
          {errors.dataClient?.country && <p className="error">{errors.dataClient.country.message}</p>}

          <div style={{ width: "100%" }}>
            <input
              {...register("dataClient.passportId")}
              placeholder="Passport/ID Number"
              required
            />
            <p style={{ fontSize: "12px", color: "#999", margin: "0.25rem 0" }}>
              {documentFormatHint}
            </p>
            {errors.dataClient?.passportId && <p className="error">{errors.dataClient.passportId.message}</p>}
          </div>

          <input
            {...register("dataClient.linkedinUrl")}
            placeholder="LinkedIn Profile URL"
            required
          />
          {errors.dataClient?.linkedinUrl && <p className="error">{errors.dataClient.linkedinUrl.message}</p>}

          <button type="submit" disabled={isSending}>
            {isSending ? "Sending..." : "Submit"}
          </button>
        </S.Data>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Submission Result"
        ariaHideApp={false}
        style={{
          content: {
            maxWidth: "400px",
            margin: "auto",
            padding: "2rem",
            textAlign: "center",
            borderRadius: "12px",
          },
        }}
      >
        <GoIssueClosed size={48} color="green" />
        <h2>{formMessage}</h2>
      </Modal>
    </S.Container>
  );
}
