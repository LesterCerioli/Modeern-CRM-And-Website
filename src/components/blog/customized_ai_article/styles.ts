// components/blog/customized_ai_article/styles.ts
import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow-y: auto;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 32px;
  color: #666;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  z-index: 1001;

  &:hover {
    background: #f5f5f5;
    color: #333;
  }
`;

export const ArticleHeader = styled.div`
  padding: 40px 40px 20px;
`;

export const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

export const Badge = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
`;

export const Date = styled.span`
  color: #666;
  font-size: 14px;
`;

export const ArticleTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  line-height: 1.3;
  color: #333;
  margin: 0;
`;

export const ArticleImageWrapper = styled.div`
  width: 100%;
  padding: 0 40px;

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 12px;
  }
`;

export const ArticleContent = styled.div`
  padding: 30px 40px 40px;
`;

export const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #444;
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 40px 0 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
`;

export const BenefitsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin: 30px 0;
`;

export const BenefitItem = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding: 20px;
  background: #f8f9ff;
  border-radius: 12px;
  border-left: 4px solid #667eea;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(5px);
  }
`;

export const BenefitIcon = styled.span`
  font-size: 24px;
  flex-shrink: 0;
`;

export const BenefitTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
`;

export const BenefitDescription = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #555;
  margin: 0;
`;

export const CTASection = styled.div`
  background: linear-gradient(135deg, #f8f9ff 0%, #e8eaff 100%);
  padding: 30px;
  border-radius: 12px;
  margin: 40px 0;
  text-align: center;
`;

export const CTATitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin: 0 0 15px 0;
`;

export const CTALink = styled.a`
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 30px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }
`;

export const Hashtags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

export const Hashtag = styled.span`
  background: #f0f0f0;
  color: #666;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;

  &:hover {
    background: #e0e0e0;
  }
`;