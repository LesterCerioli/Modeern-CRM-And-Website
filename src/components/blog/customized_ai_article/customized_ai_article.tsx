"use client";

import * as S from "./styles";

interface CustomizedAIArticleProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomizedAIArticle({ isOpen, onClose }: CustomizedAIArticleProps) {
  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>×</S.CloseButton>
        
        <S.ArticleHeader>
          <S.ArticleMeta>
            <S.Badge>AI Solutions</S.Badge>
            <S.Date>2024-01-20 · 7 min read</S.Date>
          </S.ArticleMeta>
          <S.ArticleTitle>
            🚀 Supercharge Your Business with Customized AI from Lucas Technology Service!
          </S.ArticleTitle>
        </S.ArticleHeader>

        <S.ArticleImageWrapper>
          <img
            src="/assets/imagesBlog/post_001_jan_21_2026_1021am.png"
            alt="Customized AI Solutions"
          />
        </S.ArticleImageWrapper>

        <S.ArticleContent>
          <S.Paragraph>
            In today's fast-paced world, generic solutions simply don't cut it. To truly thrive, 
            businesses of all types need intelligent, tailored strategies that address their unique 
            challenges and opportunities. That's where customized AI solutions from Lucas Technology Service come in!
          </S.Paragraph>

          <S.SectionTitle>
            Why is Customized AI a Game-Changer for YOUR Business?
          </S.SectionTitle>

          <S.BenefitsList>
            <S.BenefitItem>
              <S.BenefitIcon>🎯</S.BenefitIcon>
              <div>
                <S.BenefitTitle>Tailored to Specific Needs</S.BenefitTitle>
                <S.BenefitDescription>
                  Forget one-size-fits-all. Our AI solutions are built from the ground up to align 
                  perfectly with your operational processes, customer base, and strategic goals.
                </S.BenefitDescription>
              </div>
            </S.BenefitItem>

            <S.BenefitItem>
              <S.BenefitIcon>💡</S.BenefitIcon>
              <div>
                <S.BenefitTitle>Innovative Problem Solving</S.BenefitTitle>
                <S.BenefitDescription>
                  Uncover new ways to tackle complex problems. Customized AI can analyze vast amounts 
                  of data to provide insights and automation that lead to breakthroughs.
                </S.BenefitDescription>
              </div>
            </S.BenefitItem>

            <S.BenefitItem>
              <S.BenefitIcon>✅</S.BenefitIcon>
              <div>
                <S.BenefitTitle>Enhanced Data Accuracy</S.BenefitTitle>
                <S.BenefitDescription>
                  Improve the precision of your data analysis and predictions, leading to better 
                  decision-making and reduced errors.
                </S.BenefitDescription>
              </div>
            </S.BenefitItem>

            <S.BenefitItem>
              <S.BenefitIcon>⬆️</S.BenefitIcon>
              <div>
                <S.BenefitTitle>Increased Efficiency & Automation</S.BenefitTitle>
                <S.BenefitDescription>
                  Streamline repetitive tasks, automate workflows, and free up your team to focus on 
                  high-value activities, boosting overall productivity.
                </S.BenefitDescription>
              </div>
            </S.BenefitItem>

            <S.BenefitItem>
              <S.BenefitIcon>💰</S.BenefitIcon>
              <div>
                <S.BenefitTitle>Cost Optimization</S.BenefitTitle>
                <S.BenefitDescription>
                  Identify areas for cost reduction through optimized resource allocation, predictive 
                  maintenance, and efficient process management.
                </S.BenefitDescription>
              </div>
            </S.BenefitItem>

            <S.BenefitItem>
              <S.BenefitIcon>🔒</S.BenefitIcon>
              <div>
                <S.BenefitTitle>Improved Security & Compliance</S.BenefitTitle>
                <S.BenefitDescription>
                  Strengthen your data security and ensure regulatory compliance with AI-driven 
                  monitoring and protective measures.
                </S.BenefitDescription>
              </div>
            </S.BenefitItem>
          </S.BenefitsList>

          <S.Paragraph>
            At Lucas Technology Service, we partner with you to understand your vision and transform 
            it into powerful, bespoke AI applications that drive real, measurable results. Whether 
            you're in manufacturing, healthcare, retail, finance, or any other sector, customized AI 
            is the key to unlocking your full potential.
          </S.Paragraph>

          <S.CTASection>
            <S.CTATitle>Ready to Transform Your Business?</S.CTATitle>
            <S.CTALink href="https://lnkd.in/d2_D-aeq" target="_blank">
              Visit https://lucastechnologyservice.com
            </S.CTALink>
          </S.CTASection>

          <S.Hashtags>
            <S.Hashtag>#business</S.Hashtag>
            <S.Hashtag>#scalability</S.Hashtag>
            <S.Hashtag>#customaisolution</S.Hashtag>
            <S.Hashtag>#ai</S.Hashtag>
            <S.Hashtag>#scalability</S.Hashtag>
          </S.Hashtags>
        </S.ArticleContent>
      </S.ModalContainer>
    </S.Overlay>
  );
}