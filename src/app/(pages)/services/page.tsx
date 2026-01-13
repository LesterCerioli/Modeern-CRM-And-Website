"use client";

import WhatsAppButton from "@/components/shared/whatsapp-button/WhatsAppButton";
import * as S from "./styles";

import Service from "@/components/services/services";

export default function Services() {
  return (
    <S.Container>
      <Service  />
      <WhatsAppButton />
    </S.Container>
  );
}
