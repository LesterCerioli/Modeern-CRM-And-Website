"use client";

import { useState } from "react";
import * as S from "./styles";

interface InnovationArticleProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InnovationArticle({ isOpen, onClose }: InnovationArticleProps) {
  const [copied, setCopied] = useState(false); 
  
  if (!isOpen) return null;

  const handleShare = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  }; 

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>×</S.CloseButton>
        
        <S.ArticleHeader>
          <S.ArticleMeta>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <S.Badge>Tech Innovation</S.Badge>
              <S.Date>2026-01-23 · 7 min read</S.Date>
            </div>
            
            <S.ShareContainer>
              {copied && <S.CopyFeedback>Link Copied!</S.CopyFeedback>}
              <S.ShareButton onClick={handleShare} title="Copy link to share">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                </svg>
              </S.ShareButton>
            </S.ShareContainer>
          </S.ArticleMeta>
          <S.ArticleTitle>
            🚀 Driving Innovation Through Technology & Expertise
          </S.ArticleTitle>
        </S.ArticleHeader>

        <S.ArticleImageWrapper>
          <img
            src="/assets/imagesBlog/post003.png"
            alt="Driving Innovation Through Technology"
          />
        </S.ArticleImageWrapper>

        <S.ArticleContent>
          <S.Paragraph>
            At Lucas Technology Service, we specialize in empowering businesses with tailored solutions 
            that accelerate growth and efficiency.
          </S.Paragraph>

          <S.SectionTitle>
            Our core services include:
          </S.SectionTitle>

          <S.ServicesList>
            <S.ServiceItem>
              <S.ServiceIcon>💼</S.ServiceIcon>
              <div>
                <S.ServiceTitle>Software Project Consulting</S.ServiceTitle>
                <S.ServiceDescription>
                  Guiding organizations through every stage of project planning, execution, and delivery.
                </S.ServiceDescription>
              </div>
            </S.ServiceItem>

            <S.ServiceItem>
              <S.ServiceIcon>🚀</S.ServiceIcon>
              <div>
                <S.ServiceTitle>Digital Product Development</S.ServiceTitle>
                <S.ServiceDescription>
                  Transforming ideas into scalable, user‑centric digital products that make an impact.
                </S.ServiceDescription>
              </div>
            </S.ServiceItem>

            <S.ServiceItem>
              <S.ServiceIcon>🤖</S.ServiceIcon>
              <div>
                <S.ServiceTitle>Custom AI Solutions</S.ServiceTitle>
                <S.ServiceDescription>
                  Designing intelligent systems adapted to your unique business challenges and opportunities.
                </S.ServiceDescription>
              </div>
            </S.ServiceItem>
          </S.ServicesList>

          <S.Paragraph>
            With over a decade of experience, our team combines deep technical knowledge with strategic 
            insight to help companies innovate with confidence.
          </S.Paragraph>

          <S.CTASection>
            <S.CTATitle>
              🌐 Ready to explore how technology can unlock new possibilities for your business?
            </S.CTATitle>
            <S.CTAContent>
              <S.CTAText>
                Connect with us and let's build the future together.
              </S.CTAText>
              <S.CTALink href="https://lucastecnologyservice.com" target="_blank">
                Visit Our Website
              </S.CTALink>
              <S.WhatsAppLink href="https://wa.me/5521964108815" target="_blank">
                Chat on WhatsApp
              </S.WhatsAppLink>
            </S.CTAContent>
          </S.CTASection>

          <S.ExpertiseSection>
            <S.ExpertiseTitle>Why Choose Our Expertise?</S.ExpertiseTitle>
            <S.ExpertiseGrid>
              <S.ExpertiseItem>
                <S.ExpertiseIcon>🔧</S.ExpertiseIcon>
                <S.ExpertiseText>Technical Excellence</S.ExpertiseText>
              </S.ExpertiseItem>
              <S.ExpertiseItem>
                <S.ExpertiseIcon>🎯</S.ExpertiseIcon>
                <S.ExpertiseText>Strategic Approach</S.ExpertiseText>
              </S.ExpertiseItem>
              <S.ExpertiseItem>
                <S.ExpertiseIcon>⚡</S.ExpertiseIcon>
                <S.ExpertiseText>Rapid Implementation</S.ExpertiseText>
              </S.ExpertiseItem>
              <S.ExpertiseItem>
                <S.ExpertiseIcon>🤝</S.ExpertiseIcon>
                <S.ExpertiseText>Partnership Focus</S.ExpertiseText>
              </S.ExpertiseItem>
            </S.ExpertiseGrid>
          </S.ExpertiseSection>

          <S.Hashtags>
            <S.Hashtag>#LucasTechnologyService</S.Hashtag>
            <S.Hashtag>#TechInnovation</S.Hashtag>
            <S.Hashtag>#SoftwareConsulting</S.Hashtag>
            <S.Hashtag>#DigitalTransformation</S.Hashtag>
            <S.Hashtag>#AI Solutions</S.Hashtag>
            <S.Hashtag>#ProductDevelopment</S.Hashtag>
            <S.Hashtag>#TechnologyExpertise</S.Hashtag>
            <S.Hashtag>#BusinessInnovation</S.Hashtag>
          </S.Hashtags>
        </S.ArticleContent>
      </S.ModalContainer>
    </S.Overlay>
  );
}