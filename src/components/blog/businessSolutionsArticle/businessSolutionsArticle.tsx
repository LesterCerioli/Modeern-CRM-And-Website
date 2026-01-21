"use client";

import { useState } from "react";
import * as S from "./styles";

interface BusinessSolutionsArticleProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BusinessSolutionsArticle({ isOpen, onClose }: BusinessSolutionsArticleProps) {
  
    const [copied, setCopied] = useState(false); 
    if (!isOpen) return null;

    const handleShare = async () => {
        try{
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
            <S.Badge>B2B Solutions</S.Badge>
            <S.Date>2026-01-18</S.Date>

            <S.ShareContainer>
                {copied && <S.CopyFeedback>Link Copied!</S.CopyFeedback>}
                <S.ShareButton onClick={handleShare} title="Copy link to share">
                    🔗
                </S.ShareButton>
            </S.ShareContainer>
          </S.ArticleMeta>
          <S.ArticleTitle>
            🚀 Boost your business with the intelligence and agility of Lucas Technology Service
          </S.ArticleTitle>
        </S.ArticleHeader>

        <S.ArticleImageWrapper>
          <img
            src="/assets/imagesBlog/post002.png"
            alt="Lucas Technology Service Business Solutions"
          />
        </S.ArticleImageWrapper>

        <S.ArticleContent>
          <S.Paragraph>
            In today's competitive landscape, technology is not just a support tool, 
            but the main engine of growth. At Lucas Technology Service, we deliver robust 
            solutions that transform operational challenges into strategic advantages for the B2B market.
          </S.Paragraph>

          <S.SectionTitle>
            Why choose our services?
          </S.SectionTitle>

          <S.ServicesList>
            <S.ServiceItem>
              <S.ServiceIcon>🔹</S.ServiceIcon>
              <div>
                <S.ServiceTitle>Custom Software Development</S.ServiceTitle>
                <S.ServiceDescription>
                  We create tools that adapt to your workflow, not the other way around. 
                  Maximum productivity with intuitive and scalable systems.
                </S.ServiceDescription>
              </div>
            </S.ServiceItem>

            <S.ServiceItem>
              <S.ServiceIcon>🔹</S.ServiceIcon>
              <div>
                <S.ServiceTitle>Cloud Services (Cloud Computing)</S.ServiceTitle>
                <S.ServiceDescription>
                  Migrate your operations to the cloud with complete security. Ensure global 
                  accessibility, reduced costs for physical infrastructure, and high data availability.
                </S.ServiceDescription>
              </div>
            </S.ServiceItem>

            <S.ServiceItem>
              <S.ServiceIcon>🔹</S.ServiceIcon>
              <div>
                <S.ServiceTitle>Database as a Service (DBaaS)</S.ServiceTitle>
                <S.ServiceDescription>
                  Professional data management with optimized performance. Forget about maintenance 
                  and backup worries; we take care of the database so you can focus on your business.
                </S.ServiceDescription>
              </div>
            </S.ServiceItem>

            <S.ServiceItem>
              <S.ServiceIcon>🔹</S.ServiceIcon>
              <div>
                <S.ServiceTitle>Focus on B2B Solutions</S.ServiceTitle>
                <S.ServiceDescription>
                  We understand the complexity of business-to-business relationships. Our solutions 
                  are designed to integrate processes, improve communication, and accelerate closings.
                </S.ServiceDescription>
              </div>
            </S.ServiceItem>
          </S.ServicesList>

          <S.SectionTitle>
            ✅ Real Advantages
          </S.SectionTitle>

          <S.AdvantagesGrid>
            <S.AdvantageItem>
              <S.CheckIcon>✓</S.CheckIcon>
              <span>Reduction of operational costs</span>
            </S.AdvantageItem>
            <S.AdvantageItem>
              <S.CheckIcon>✓</S.CheckIcon>
              <span>Enterprise-level data security</span>
            </S.AdvantageItem>
            <S.AdvantageItem>
              <S.CheckIcon>✓</S.CheckIcon>
              <span>Scalability for growth without technical limitations</span>
            </S.AdvantageItem>
            <S.AdvantageItem>
              <S.CheckIcon>✓</S.CheckIcon>
              <span>Specialized and readily available support</span>
            </S.AdvantageItem>
          </S.AdvantagesGrid>

          <S.CTASection>
            <S.CTATitle>Ready to transform your business?</S.CTATitle>
            <S.CTAContent>
              
              <S.WhatsAppLink href="https://wa.me/5521964108815" target="_blank">
                📱 Talk to us directly via WhatsApp: +55 21 964108815
              </S.WhatsAppLink>
            </S.CTAContent>
          </S.CTASection>

          <S.Conclusion>
            Lucas Technology Service – Your partner on your digital transformation journey.
          </S.Conclusion>

          <S.Hashtags>
            <S.Hashtag>#LucasTechnologyService</S.Hashtag>
            <S.Hashtag>#B2BSolutions</S.Hashtag>
            <S.Hashtag>#SoftwareDevelopment</S.Hashtag>
            <S.Hashtag>#CloudComputing</S.Hashtag>
            <S.Hashtag>#DatabaseAsAService</S.Hashtag>
            <S.Hashtag>#TechInnovation</S.Hashtag>
            <S.Hashtag>#TransformacaoDigital</S.Hashtag>
            <S.Hashtag>#BusinessGrowth</S.Hashtag>
          </S.Hashtags>
        </S.ArticleContent>
      </S.ModalContainer>
    </S.Overlay>
  );
}