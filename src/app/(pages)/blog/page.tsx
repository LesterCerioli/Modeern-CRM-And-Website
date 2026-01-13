"use client";

import ModernJavaScriptArticle from "@/components/blog/modern_javascript_article/modern_javascript_article";

import * as S from "./styles";
import Link from "next/link";
import { useState } from "react";
import ReactPerformance from "@/components/blog/reactPerformance/reactPerformance";
import WhatsAppButton from "@/components/shared/whatsapp-button/WhatsAppButton";

type ArticleType = "javascript" | "react";

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
              
              {/* Abre artigo JavaScript */}
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
              <S.Meta>2024-01-10 · 10 min read</S.Meta>
              <h3>React Performance Optimization: Best Practices for 2024</h3>
              <p>
                Learn the latest techniques to optimize your React applications
                for maximum performance and better user experience.
              </p>

              {/* Abre artigo React */}
              <S.ReadMoreButton onClick={() => handleOpenArticle("react")}>
                READ MORE
              </S.ReadMoreButton>

              
            </S.CardContent>
          </S.FeaturedCard>
        </S.FeaturedGrid>
      </S.Container>

      {/* Renderiza o componente correto baseado no artigo aberto */}
      <ModernJavaScriptArticle 
        isOpen={openArticle === "javascript"} 
        onClose={handleCloseArticle} 
      />
      
      <ReactPerformance 
        isOpen={openArticle === "react"} 
        onClose={handleCloseArticle} 
      />
      <WhatsAppButton />
    </>
  );
}