"use client";

import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "react-modal";
import { GoIssueClosed } from "react-icons/go";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const schemaForm = z.object({
  dataClient: z.object({
    firstName: z.string().min(3, "Please enter your first name "),
    lastName: z.string().min(3, "Please enter your last name"),
    email: z.string().email("E-mail inválido").min(6, "Invalid email"),
    telephone: z.string().min(11, "Please enter your phone number"),
    city: z.string().min(3, "Please enter your city"),
    state: z.string().min(2, "Please enter your state"),
    country: z.string().min(4, "Please enter your country"),
    linkedinUrl: z.string().url("Please enter a valid URL").regex(
      /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/,
      "URL inválida. Exemplo: https://www.linkedin.com/in/seu-nome/"
    ),
  }),
});

type FormProps = z.infer<typeof schemaForm>;

export default function Form() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_CANDIDATES = process.env.NEXT_PUBLIC_API_CANDIDATES;

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

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    reset();
  };

  const handleFormSubmit = async (data: FormProps) => {
    setIsSending(true);
    try {
      const response = await fetch(`${API_BASE_URL}${API_CANDIDATES}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.dataClient),
      });

      const result = await response.json();

      if (response.ok) {
        openModal();
        setFormMessage("Your registration was successfully submitted!");
        setTimeout(closeModal, 2000);
      } else {
        setFormMessage(result.error || "Error on data sending.");
      }
    } catch (error) {
      console.error("Error with server connection:", error);
      setFormMessage("Failed with server connection. Try again...");
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
          <h1>Sign up to apply for our job openings.</h1>
          <label className="line" />
        </S.Title>

        <S.Data>
          <input {...register("dataClient.firstName")} type="text" placeholder="First Name" />
          {errors.dataClient?.firstName && <p>{errors.dataClient.firstName.message}</p>}

          <input {...register("dataClient.lastName")} type="text" placeholder="Last Name" />
          {errors.dataClient?.lastName && <p>{errors.dataClient.lastName.message}</p>}

          <input {...register("dataClient.email")} type="email" placeholder="Email" />
          {errors.dataClient?.email && <p>{errors.dataClient.email.message}</p>}

          <input {...register("dataClient.telephone")} type="tel" placeholder="Telephone" />
          {errors.dataClient?.telephone && <p>{errors.dataClient.telephone.message}</p>}

          <input {...register("dataClient.city")} type="text" placeholder="City" />
          {errors.dataClient?.city && <p>{errors.dataClient.city.message}</p>}

          <input {...register("dataClient.state")} type="text" placeholder="State" />
          {errors.dataClient?.state && <p>{errors.dataClient.state.message}</p>}

          <input {...register("dataClient.country")} type="text" placeholder="Country" />
          {errors.dataClient?.country && <p>{errors.dataClient.country.message}</p>}

          <input {...register("dataClient.linkedinUrl")} type="text" placeholder="LinkedIn URL" />
          {errors.dataClient?.linkedinUrl && <p>{errors.dataClient.linkedinUrl.message}</p>}
        </S.Data>

        <S.FirstButton>
          <button type="submit" disabled={isSending} className={isSending ? "sending" : ""}>
            {isSending ? "Sending..." : "Send"}
          </button>
        </S.FirstButton>
      </form>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Registration Modal">
        <p>{formMessage}</p>
        <S.Button>
          <GoIssueClosed />
        </S.Button>
      </Modal>
    </S.Container>
  );
}
