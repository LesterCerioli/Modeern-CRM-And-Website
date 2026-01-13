"use client";
import WhatsAppButton from "@/components/shared/whatsapp-button/WhatsAppButton";
import * as S from "./styles";
import Form from "@/components/jobs/candidateForm/candidateForm";


export default function Job() {
  return (
    <S.Container>
      <Form />
      <WhatsAppButton />
    </S.Container>
  );
}
