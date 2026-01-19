"use client";

import React from "react";
import * as S from "./styles";

interface PostData {
  title: string;
  content: string;
  date: string;
  imageUrl: string;
  category: string;
}

interface DynamicPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: PostData | null;
}

const DynamicPostModal: React.FC<DynamicPostModalProps> = ({ isOpen, onClose, post }) => {
  if (!post) return null;

  return (
    <S.Overlay $isOpen={isOpen} onClick={onClose}>
      {/* O stopPropagation impede que o clique dentro do modal feche ele */}
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        
        <S.HeaderImage src={post.imageUrl} alt={post.title} />
        
        <S.ContentBody>
          <div className="meta">
            <span>{post.category}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
          
          <h2>{post.title}</h2>
          
          <div className="text-content">
            {post.content}
          </div>
        </S.ContentBody>
      </S.ModalContent>
    </S.Overlay>
  );
};

export default DynamicPostModal;