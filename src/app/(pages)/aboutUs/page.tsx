"use client";

import React from "react";
import * as S from "./styles";

import Cookies from "@/components/home/cookies/cookies/cookies";
import { WelcomeSection } from "@/components/home/cookies/welcomeSection/welcomeSection";
import { OutlineSection } from "@/components/home/cookies/outlineSection/OutlineSection";
import { AboutUsSection } from "@/components/home/cookies/aboutUsSection/aboutUsSection";
import { TimelineSection } from "@/components/home/cookies/timelineSection/TimelineSection";
import { BlogSection } from "@/components/home/cookies/blogSection/blogSection";
import { ContactSection } from "@/components/home/cookies/contactSection/contactSection";
import WhatsAppButton from "@/components/shared/whatsapp-button/WhatsAppButton";

const Home: React.FC = () => {
  return (
    <S.PageBackground> {/* Adicione este wrapper */}
      <S.Container>
        {/* HERO FULL WIDTH */}
        <WelcomeSection />

        <S.MainContent>
          <OutlineSection />
          <TimelineSection />
        </S.MainContent>

        <S.CookiesWrapper>
          <Cookies />
        </S.CookiesWrapper>
      </S.Container>
      <WhatsAppButton />
    </S.PageBackground> 
  );
};

export default Home;