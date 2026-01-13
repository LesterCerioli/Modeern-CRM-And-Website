"use client";
import * as S from "./styles";

import Hero from "@/components/blog/hero/Hero";
import { BlogHeader } from "@/components/blog/blogHeader/BlogHeader";
import WhatsAppButton from "@/components/shared/whatsapp-button/WhatsAppButton";

export default function FrontEndPosts() {
  return (
    <S.Container>
      <BlogHeader />
      <Hero />
      <WhatsAppButton />
    </S.Container>
    
  );
}
