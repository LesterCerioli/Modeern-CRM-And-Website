"use client";

import ModernJavaScriptArticle from "@/components/blog/modern_javascript_article/modern_javascript_article";

import * as S from "./styles";
import Link from "next/link";
import { useState } from "react";
import ReactPerformance from "@/components/blog/reactPerformance/reactPerformance";
import WhatsAppButton from "@/components/shared/whatsapp-button/WhatsAppButton";
import BlogPostForm from "@/components/blog/blogPostForm/blogPostForm";


type ArticleType = "javascript" | "react";

export default function PostPage() {
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
          <h1>CMS Creator</h1>
          
          
        </S.Hero>

        <S.FeaturedGrid>
          
          <S.FeaturedCard>
            <BlogPostForm />''

            
          </S.FeaturedCard>

          
        </S.FeaturedGrid>
      </S.Container>

       
      
      
      <ReactPerformance 
        isOpen={openArticle === "react"} 
        onClose={handleCloseArticle} 
      />
      <WhatsAppButton />
    </>
  );
}