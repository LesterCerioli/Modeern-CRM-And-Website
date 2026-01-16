"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import * as S from "./styles";

const BlogPostForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith('.csv')) {
      setFile(selectedFile);
    } else {
      alert("Please, select only files in .csv format");
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      title,
      content,
      scheduleDate: date,
      imageFile: file?.name
    };

    console.log("Publishing post:", newPost);

    // Ativa a tarja verde
    setIsSuccess(true);

    // Aguarda 2 segundos com a mensagem na tela antes de ir para o blog
    setTimeout(() => {
      router.push("/blog");
    }, 2000);
  };

  return (
    <S.FormContainer onSubmit={handleSubmit}>
      {isSuccess && (
        <S.SuccessBanner>
          Post published successfully! Redirecting...
        </S.SuccessBanner>
      )}

      <S.Title>CMS - Post Creator</S.Title>
      
      <S.FormGroup>
        <label>Post Title</label>
        <S.Input 
          type="text"  
          placeholder="Ex: Next.js News in 2026" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required 
          disabled={isSuccess}
        />
      </S.FormGroup>

      <S.FormGroup>
        <label>Post Content</label>
        <S.TextArea 
          placeholder="Write the full text here..." 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required 
          disabled={isSuccess}
        />
      </S.FormGroup>

      <S.FormGroup>
        <label>Scheduling Publish Date and Time</label>
        <S.Input 
          type="datetime-local" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required 
          disabled={isSuccess}
        />
      </S.FormGroup>

      <S.FormGroup>
        <label>Image upload (Only .csv)</label>
        <S.Input 
          type="file" 
          accept=".csv" 
          onChange={handleFileChange}
          required 
          disabled={isSuccess}
        />
      </S.FormGroup>

      <S.SubmitButton type="submit" disabled={isSuccess}>
        {isSuccess ? "Published" : "Publish Post"}
      </S.SubmitButton>
    </S.FormContainer>
  );
};

export default BlogPostForm;