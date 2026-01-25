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
  justify-content: space-between;
`;

export const Badge = styled.span`
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
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

export const ServicesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 30px 0;
`;

export const ServiceItem = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding: 20px;
  background: #fffbeb;
  border-radius: 12px;
  border-left: 4px solid #f59e0b;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(5px);
    background: #fef3c7;
  }
`;

export const ServiceIcon = styled.span`
  font-size: 24px;
  flex-shrink: 0;
  margin-top: 2px;
`;

export const ServiceTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #92400e;
  margin: 0 0 8px 0;
`;

export const ServiceDescription = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #78350f;
  margin: 0;
`;

export const CTASection = styled.div`
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  padding: 30px;
  border-radius: 12px;
  margin: 40px 0;
  text-align: center;
`;

export const CTATitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #92400e;
  margin: 0 0 20px 0;
  line-height: 1.4;
`;

export const CTAText = styled.p`
  font-size: 16px;
  color: #78350f;
  margin-bottom: 20px;
`;

export const CTAContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

export const CTALink = styled.a`
  display: inline-block;
  background: #f59e0b;
  color: white;
  padding: 14px 28px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  width: 100%;
  text-align: center;

  &:hover {
    background: #d97706;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3);
  }
`;

export const WhatsAppLink = styled.a`
  display: inline-block;
  background: #25d366;
  color: white;
  padding: 14px 28px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  width: 100%;
  text-align: center;

  &:hover {
    background: #128c7e;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(37, 211, 102, 0.3);
  }
`;

export const ExpertiseSection = styled.div`
  margin: 40px 0;
  padding: 30px;
  background: #f8fafc;
  border-radius: 12px;
`;

export const ExpertiseTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 25px;
`;

export const ExpertiseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ExpertiseItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: white;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const ExpertiseIcon = styled.span`
  font-size: 24px;
`;

export const ExpertiseText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
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
  background: #f1f5f9;
  color: #475569;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
    color: #334155;
  }
`;

export const ShareButton = styled.button`
  background: #10b981;
  border: none;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 8px;
  margin-left: 10px;

  &:hover {
    background: #059669;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 20px;
    height: 20px;
    fill: white;
  }
`;

export const ShareContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`;

export const CopyFeedback = styled.span`
  font-size: 12px;
  color: #10b981;
  font-weight: 600;
  animation: fadeIn 0.3s ease;
  white-space: nowrap;
`;