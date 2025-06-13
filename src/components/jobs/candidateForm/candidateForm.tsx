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
  const API_CANDIDATES = process.env.NEXT_API_CANDIDATES || "/api/candidates";

  useEffect(() => {
    console.log("📢 Form loaded!");
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
        linkedinUrl: "",
      },
    },
  });

  const handleFormSubmit = async (data: FormProps) => {
    console.log("📢 Sending request...");
    console.log("📦 Submitted data:", data);
    setIsSending(true);

    try {
      const response = await fetch(`https://lts-us-website.vercel.app/api/candidates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.dataClient),
      });

      const result = await response.json();
      console.log("📌 API response:", result);

      if (response.ok) {
        openModal();
        setFormMessage("✅ Your application has been submitted successfully!");
        reset();
        setTimeout(() => closeModal(), 2000);
      } else {
        setFormMessage(result.error || "❌ Error submitting application.");
      }
    } catch (error) {
      console.error("🚨 Error connecting to server:", error);
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
      </form>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Submission Confirmation">
        <p>{formMessage}</p>
        <S.Button onClick={closeModal}>
          <GoIssueClosed />
        </S.Button>
      </Modal>
    </S.Container>
  );
}
