"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import * as S from "./styles";

import Cookies from "@/components/home/cookies/cookies/cookies";
import { Header } from "@/components/shared/header/header";

import WhatsAppButton from "@/components/shared/whatsapp-button/WhatsAppButton";

const Home: React.FC = () => {
  const services = [
    {
      title: "Cloud Infrastructure",
      description: "Scalable and secure cloud solutions for modern businesses"
    },
    {
      title: "Development & Implementation",
      description: "End-to-end software development and deployment services"
    },
    {
      title: "Enterprise Business",
      description: "Transformative solutions for large-scale business challenges"
    },
    {
      title: "IT Services Consulting",
      description: "Expert guidance for technology strategy and optimization"
    }
  ];

  return (
    <S.PageBackground>
      <S.Container>
        <Header />

        <S.MainContent>
          {/* Hero Section */}
          <S.HeroSectionBlack>
            <S.HeroTitleWhite>
              Global Leader in<br />
              Digital Transformation<br />
              and Cloud Infrastructure
            </S.HeroTitleWhite>
          </S.HeroSectionBlack>

          {/* Stats Section */}
          <S.StatsSection>
            <S.StatItem>
              <S.StatNumberWhite>50+</S.StatNumberWhite>
              <S.StatLabelWhite>Countries</S.StatLabelWhite>
            </S.StatItem>
            <S.StatItem>
              <S.StatNumberWhite>40+</S.StatNumberWhite>
              <S.StatLabelWhite>Locations</S.StatLabelWhite>
            </S.StatItem>
          </S.StatsSection>

          {/* About Us Section with Image */}
          <S.AboutUsWithImageSection>
            <S.AboutUsContent>
              <Link href="/aboutUs" passHref>
                <S.ClickableSectionTitleWhite>About Us</S.ClickableSectionTitleWhite>
              </Link>
              <S.AboutUsTextWhite>
                Leading in innovative history for optimal financial progress and relentless sage
                november, realities and dustfiring.
              </S.AboutUsTextWhite>
              <S.AboutUsMoreTextWhite>
                We empower businesses through cutting-edge technology solutions and strategic
                digital transformation initiatives that drive growth and innovation.
              </S.AboutUsMoreTextWhite>
            </S.AboutUsContent>
            <S.AboutUsImageWrapper>
              <Image
                src="/assets/imagesHome/user_image.svg"
                alt="About Us"
                width={400}
                height={300}
                style={{ objectFit: "contain" }}
              />
            </S.AboutUsImageWrapper>
          </S.AboutUsWithImageSection>

          
          <S.ServicesSectionGreen>
            <S.SectionTitleWhiteCenter>Services</S.SectionTitleWhiteCenter>
            <S.ServicesGrid>
              {services.map((service, index) => (
                <S.ServiceCardGreen key={index}>
                  <S.ServiceTitleWhite>{service.title}</S.ServiceTitleWhite>
                  <S.ServiceDescriptionWhite>{service.description}</S.ServiceDescriptionWhite>
                </S.ServiceCardGreen>
              ))}
            </S.ServicesGrid>
            
          </S.ServicesSectionGreen>

          
          <S.CaseStudiesWithImageSection>
            <S.CaseStudiesContent>
              <S.SectionTitleWhite>Case Studies</S.SectionTitleWhite>
              <S.CaseStudiesGrid>
                <S.CaseStudyItem>
                  <S.CaseStudyTitleWhite>Optimizing Financial Services</S.CaseStudyTitleWhite>
                  <S.CaseStudyTextWhite>
                    Empowering enterprises and obtaining, professional development. Medical pulled nontrilling.
                  </S.CaseStudyTextWhite>
                </S.CaseStudyItem>
                <S.CaseStudyItem>
                  <S.CaseStudyTitleWhite>Healthcare App Development</S.CaseStudyTitleWhite>
                  <S.CaseStudyTextWhite>
                    Substantiate fractional acadorn participated resolonbating eudicatelement.
                  </S.CaseStudyTextWhite>
                </S.CaseStudyItem>
              </S.CaseStudiesGrid>
            </S.CaseStudiesContent>
            <S.CaseStudiesImageWrapper>
              <Image
                src="/assets/imagesHome/studied_case.svg"
                alt="Case Studies"
                width={400}
                height={300}
                style={{ objectFit: "contain" }}
              />
            </S.CaseStudiesImageWrapper>
          </S.CaseStudiesWithImageSection>

          {/* Global Presence Section */}
          <S.GlobalPresenceOrangeSection>
            <S.SectionTitleWhite>Global Presence</S.SectionTitleWhite>
            <S.GlobalPresenceTextWhite>
              Catalogue of Facing-Ho hagenessaccades
            </S.GlobalPresenceTextWhite>
          </S.GlobalPresenceOrangeSection>
        </S.MainContent>
        <WhatsAppButton />

        

        <S.CookiesWrapper>
          <Cookies />
        </S.CookiesWrapper>
      </S.Container>
    </S.PageBackground> 
  );
};

export default Home;