"use client";

import React from "react";
import * as S from "./styles";

import Cookies from "@/components/home/cookies/cookies/cookies";
import { WelcomeSection } from "@/components/home/cookies/welcomeSection/welcomeSection";
import { OutlineSection } from "@/components/home/cookies/outlineSection/OutlineSection";
import { AboutUsSection } from "@/components/home/cookies/aboutUsSection/aboutUsSection";
import { ServicesSection } from "@/components/home/cookies/servicesSection/servicesSection";
import { PortfolioSection } from "@/components/home/cookies/portfolioSection/portfolioSection";
import { TimelineSection } from "@/components/home/cookies/timelineSection/TimelineSection";
import { BlogSection } from "@/components/home/cookies/blogSection/blogSection";
import { ContactSection } from "@/components/home/cookies/contactSection/contactSection";

const Home: React.FC = () => {
  return (
    <S.Container>
      {/* HERO FULL WIDTH */}
      <WelcomeSection />

      <S.MainContent>
        <OutlineSection />
        <AboutUsSection />
        <ServicesSection />
        <PortfolioSection />
        <TimelineSection />
        <BlogSection />
        <ContactSection />
      </S.MainContent>

      <S.CookiesWrapper>
        <Cookies />
      </S.CookiesWrapper>
    </S.Container>
  );
};

export default Home;
