"use client";

import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { FieldError, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "react-modal";
import { GoIssueClosed } from "react-icons/go";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

// Generic Passport ID validation (alphanumeric, length 5 to 20)
const passportRegex = /^[a-zA-Z0-9]{5,20}$/;

const schemaForm = z.object({
  dataClient: z.object({
    firstName: z.string().min(3, "Please enter your first name"),
    lastName: z.string().min(3, "Please enter your last name"),
    email: z.string().email("Invalid email").min(6, "Please enter your email"),
    telephone: z.string().min(11, "Please enter a valid phone number"),
    city: z.string().min(3, "Please enter your city name"),
    state: z.string().min(2, "Please enter your state name"),
    country: z.string().min(4, "Please enter your country"),
    passportId: z.string()
      .regex(passportRegex, "Invalid passport number (5–20 alphanumeric characters)"),
    linkedinUrl: z.string().url("Please enter a valid URL")
      .regex(/^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/, "Invalid LinkedIn URL. Example: https://www.linkedin.com/in/your-name/"),
  }),
});

type FormProps = z.infer<typeof schemaForm>;

export default function Form() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://lts-us-website.vercel.app";
  // API_CANDIDATES is not used directly in the fetch URL as per subtask, but kept for other potential uses.
  const API_CANDIDATES_PATH = process.env.NEXT_API_CANDIDATES || "/api/candidates"; 
  const CANDIDATES_SUBMISSION_URL = "https://lts-us-website.vercel.app/api/candidates"; // Explicit URL from subtask

  useEffect(() => {
    console.log("📢 Form loaded!");
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    // Do not reset form message here, it might be an error message we want to keep.
    // Resetting the form fields is fine.
    reset(); 
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(schemaForm),
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

  const handleFormSubmit = async (data: FormProps) => {
    console.log("📢 Initiating form submission...");
    setIsSending(true);
    setFormMessage(null); // Clear previous messages

    let token = null;

    // Step 1: Authenticate
    try {
      console.log(`🔑 Attempting login to ${API_BASE_URL}/api/auth/login`);
      const loginResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: "admin", password: "password" }),
      });

      const loginResult = await loginResponse.json();
      console.log("🔑 Login API response:", loginResult);

      if (!loginResponse.ok) {
        setFormMessage(loginResult.error || "❌ Authentication failed. Please try again.");
        setIsSending(false);
        return;
      }

      if (!loginResult.token) {
        setFormMessage("❌ Authentication successful, but no token received.");
        setIsSending(false);
        return;
      }
      token = loginResult.token;
      console.log("🔑 Token received.");

    } catch (error) {
      console.error("🚨 Error during login request:", error);
      setFormMessage("❌ Error connecting to authentication server. Please check your connection.");
      setIsSending(false);
      return;
    }

    // Step 2: Submit Candidate Data
    try {
      console.log(`📦 Submitting candidate data to ${CANDIDATES_SUBMISSION_URL}`);
      const candidateResponse = await fetch(CANDIDATES_SUBMISSION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Add Authorization header
        },
        body: JSON.stringify(data.dataClient),
      });

      const candidateResult = await candidateResponse.json();
      console.log("📌 Candidate API response:", candidateResult);

      if (candidateResponse.ok) {
        setFormMessage("✅ Your application has been submitted successfully!");
        openModal(); // Open modal on success
        reset(); // Reset form fields
        // setTimeout is not strictly needed here if modal has its own close button.
        // If auto-close is desired, keep it but ensure closeModal doesn't clear success message.
        // For now, let user close modal.
      } else {
        // Handle specific errors from candidate API
        if (candidateResponse.status === 401) {
             setFormMessage(candidateResult.error || "❌ Authorization failed for candidate submission. Please try re-submitting.");
        } else if (candidateResult.errors) { // Handle Zod validation errors if any
            const errorMessages = Object.values(candidateResult.errors).flat().join(", ");
            setFormMessage(`❌ Error submitting application: ${errorMessages}`);
        }
        else {
            setFormMessage(candidateResult.error || "❌ Error submitting application. Please try again.");
        }
      }
    } catch (error) {
      console.error("🚨 Error connecting to candidate server:", error);
      setFormMessage("❌ Error connecting to application server. Please check your connection.");
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
          <h1>Register for our job opportunities</h1>
          <label className="line"></label>
        </S.Title>

        <S.Data>
          <input {...register("dataClient.firstName")} type="text" placeholder="First Name" required />
          {errors.dataClient?.firstName && <p style={{ color: "red", fontSize: "10px" }}>{errors.dataClient.firstName.message}</p>}

          <input {...register("dataClient.lastName")} type="text" placeholder="Last Name" required />
          {errors.dataClient?.lastName && <p style={{ color: "red", fontSize: "10px" }}>{errors.dataClient.lastName.message}</p>}

          <input {...register("dataClient.email")} type="email" placeholder="Email" required />
          {errors.dataClient?.email && <p style={{ color: "red", fontSize: "10px" }}>{errors.dataClient.email.message}</p>}

          <input {...register("dataClient.telephone")} type="tel" placeholder="Phone" required />
          {errors.dataClient?.telephone && <p style={{ color: "red", fontSize: "10px" }}>{errors.dataClient.telephone.message}</p>}

          <input {...register("dataClient.city")} type="text" placeholder="City" required />
          {errors.dataClient?.city && <p style={{ color: "red", fontSize: "10px" }}>{errors.dataClient.city.message}</p>}

          <input {...register("dataClient.state")} type="text" placeholder="State" required />
          {errors.dataClient?.state && <p style={{ color: "red", fontSize: "10px" }}>{errors.dataClient.state.message}</p>}

          <input {...register("dataClient.country")} type="text" placeholder="Country" required />
          {errors.dataClient?.country && <p style={{ color: "red", fontSize: "10px" }}>{errors.dataClient.country.message}</p>}

          <input {...register("dataClient.passportId")} type="text" placeholder="Passport ID" required />
          {errors.dataClient?.passportId && <p style={{ color: "red", fontSize: "10px" }}>{errors.dataClient.passportId.message}</p>}

          <input {...register("dataClient.linkedinUrl")} type="text" placeholder="LinkedIn" required />
          {errors.dataClient?.linkedinUrl && <p style={{ color: "red", fontSize: "10px" }}>{errors.dataClient.linkedinUrl.message}</p>}
        </S.Data>

        <S.FirstButton>
          <label>
            <button type="submit" className={isSending ? "sending" : ""} disabled={isSending}>
              {isSending ? "Sending..." : "Submit"}
            </button>
          </label>
        </S.FirstButton>
        {formMessage && <p style={{ marginTop: '10px', color: formMessage.startsWith('✅') ? 'green' : 'red' }}>{formMessage}</p>}
      </form>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Submission Confirmation" 
             style={{ content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', padding: '20px', zIndex: 1000 } }}>
        <p>{formMessage}</p>
        <S.Button onClick={closeModal} style={{ marginTop: '10px', cursor: 'pointer' }}> {/* Added some basic styling for visibility */}
          <GoIssueClosed /> Close
        </S.Button>
      </Modal>
    </S.Container>
  );
}
