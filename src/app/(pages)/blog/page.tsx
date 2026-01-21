"use client";

import ModernJavaScriptArticle from "@/components/blog/modern_javascript_article/modern_javascript_article";

import * as S from "./styles";
import { useState } from "react";
import ReactPerformance from "@/components/blog/reactPerformance/reactPerformance";
import WhatsAppButton from "@/components/shared/whatsapp-button/WhatsAppButton";
import CustomizedAIArticle from "@/components/blog/customized_ai_article/customized_ai_article";
import BusinessSolutionsArticle from "@/components/blog/businessSolutionsArticle/businessSolutionsArticle";
import { getReadingTime, getTimeAgo } from "@/utils/dateUtils";
import InnovationArticle from "@/components/blog/innovationArticle/innovationArticle";


type ArticleType = "javascript" | "react" | "ai" | "b2b" | "innovation";

const ARTICLES_PUBLISH_DATES = {
  javascript: new Date("2024-01-15T10:00:00"),
  react: new Date("2026-01-15T14:30:00"),
  ai: new Date("2026-01-21T10:21:00"),
  b2b: new Date("2026-01-22T09:15:00"),
  innovation: new Date("2026-01-21T15:45:00"), 
};

const ARTICLES_WORD_COUNT = {
  javascript: 1600,
  react: 2000,
  ai: 1400,
  b2b: 1800,
  innovation: 1400,
};

export default function BlogPage() {
  const [openArticle, setOpenArticle] = useState<ArticleType | null>(null);

  const handleOpenArticle = (article: ArticleType) => {
    setOpenArticle(article);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseArticle = () => {
    setOpenArticle(null);
    document.body.style.overflow = 'auto';
  };

  const getArticleMeta = (articleType: ArticleType) => {
    const publishDate = ARTICLES_PUBLISH_DATES[articleType];
    const wordCount = ARTICLES_WORD_COUNT[articleType];
    const readingTime = getReadingTime(wordCount);
    const timeAgo = getTimeAgo(publishDate);

    return `${timeAgo} · ${readingTime} min read`;
  };

  return (
    <>
      <S.Container>
        <S.Hero>
          <h1>New Articles</h1>
          <p>Handpicked content for your learning journey</p>
        </S.Hero>

        <S.FeaturedGrid>
          {/* Artigo JavaScript */}
          <S.FeaturedCard>
            <S.ImageWrapper>
              <S.Badge>JavaScript</S.Badge>
              <img
                src="/assets/imagesBlog/marketing_modern.png"
                alt="Mastering Modern JavaScript ES6+"
              />
            </S.ImageWrapper>

            <S.CardContent>
              <S.Meta>2024-01-15 · 8 min read</S.Meta>
              <h3>Mastering Modern JavaScript: ES6+ Features You Need to Know</h3>
              <p>
                Discover the most important ES6+ features that every JavaScript
                developer should master to write cleaner, more efficient, and
                scalable code.
              </p>
              <S.ReadMoreButton onClick={() => handleOpenArticle("javascript")}>
                READ MORE
              </S.ReadMoreButton>
            </S.CardContent>
          </S.FeaturedCard>

          {/* Artigo React */}
          <S.FeaturedCard>
            <S.ImageWrapper>
              <S.Badge variant="react">React</S.Badge>
              <img
                src="/assets/imagesBlog/react_performance.png"
                alt="React Performance Optimization"
              />
            </S.ImageWrapper>

            <S.CardContent>
              <S.Meta>2026-01-15 · 10 min read</S.Meta>
              <h3>React Performance Optimization: Best Practices for 2026</h3>
              <p>
                Learn the latest techniques to optimize your React applications
                for maximum performance and better user experience.
              </p>
              <S.ReadMoreButton onClick={() => handleOpenArticle("react")}>
                READ MORE
              </S.ReadMoreButton>
            </S.CardContent>
          </S.FeaturedCard>

          {/* AI Article */}
          <S.FeaturedCard>


            <S.ImageWrapper>
              <S.Badge variant="ai">AI Solutions</S.Badge>
              <img
                src="/assets/imagesBlog/post_001_jan_21_2026_1021am.png" // Use a imagem fornecida
                alt="Customized AI Solutions"
              />
            </S.ImageWrapper>

            <S.CardContent>
              <S.Meta>2026-01-21 10:21 AM</S.Meta>
              <h3>🚀 Supercharge Your Business with Customized AI</h3>
              <p>
                Discover how tailored AI solutions can transform your business operations,
                improve efficiency, and drive measurable results across all sectors.
              </p>
              <S.ReadMoreButton onClick={() => handleOpenArticle("ai")}>
                READ MORE
              </S.ReadMoreButton>
            </S.CardContent>
          </S.FeaturedCard>

          <S.FeaturedCard>
            <S.ImageWrapper>
              <S.Badge variant="innovation">Tech Innovation</S.Badge>
              <img
                src="/assets/imagesBlog/post003.png"
                alt="Driving Innovation Through Technology"
              />
            </S.ImageWrapper>
            <S.CardContent>
              <S.Meta>{getArticleMeta("innovation")}</S.Meta>
              <h3>🚀 Driving Innovation Through Technology & Expertise</h3>
              <p>
                Discover how our technical expertise and innovative solutions can 
                transform your business and drive sustainable growth.
              </p>
              <S.ReadMoreButton onClick={() => handleOpenArticle("innovation")}>
                READ MORE
              </S.ReadMoreButton>
            </S.CardContent>
          </S.FeaturedCard>

          <S.FeaturedCard>
            <S.ImageWrapper>
              <S.Badge variant="b2b">B2B Solutions</S.Badge>
              <img
                src="/assets/imagesBlog/post002.png"
                alt="Business Solutions"
              />
            </S.ImageWrapper>
            <S.CardContent>
              <S.Meta>2026-01-22 · 8 min read</S.Meta>
              <h3>🚀 Boost Your Business with Lucas Technology Service</h3>
              <p>
                Discover how our B2B solutions in software development, cloud services, 
                and database management can transform your business operations.
              </p>
              <S.ReadMoreButton onClick={() => handleOpenArticle("b2b")}>
                READ MORE
              </S.ReadMoreButton>
            </S.CardContent>

          </S.FeaturedCard>
        </S.FeaturedGrid>
      </S.Container>

      
      <ModernJavaScriptArticle 
        isOpen={openArticle === "javascript"} 
        onClose={handleCloseArticle} 
      />
      
      <ReactPerformance 
        isOpen={openArticle === "react"} 
        onClose={handleCloseArticle} 
      />

      <CustomizedAIArticle 
        isOpen={openArticle === "ai"} 
        onClose={handleCloseArticle} 
      />

      <BusinessSolutionsArticle 
        isOpen={openArticle === "b2b"} 
        onClose={handleCloseArticle} 
      />

      <InnovationArticle 
        isOpen={openArticle === "innovation"} 
        onClose={handleCloseArticle} 
      />
      
      <WhatsAppButton />
    </>
  );
}