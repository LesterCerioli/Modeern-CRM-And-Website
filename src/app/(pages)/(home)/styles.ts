import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;

  button {
    text-transform: uppercase;
    padding: 14px 28px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.08em;
    transition: all 0.2s ease-in-out;
    background-color: #007bff;
    color: #fff;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
  }
`;

export const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;

  & > section {
    margin-bottom: 100px;
  }
`;

export const CookiesWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

export const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 60px;
`;

export const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  line-height: 1.3;
  color: #333;
`;

export const SourceText = styled.p`
  font-style: italic;
  color: #666;
  font-size: 0.9rem;
`;

export const StatsSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-bottom: 60px;
  flex-wrap: wrap;
`;

export const StatItem = styled.div`
  text-align: center;
`;

export const StatNumber = styled.h2`
  font-size: 3rem;
  color: #1a73e8;
  margin: 0 0 10px 0;
  font-weight: 700;
`;

export const StatLabel = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: #555;
`;

export const AboutUsSection = styled.section`
  margin-bottom: 60px;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

export const AboutUsText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  max-width: 800px;
`;

export const ServicesSection = styled.section`
  background: #f9f9f9;
  padding: 50px 30px;
  border-radius: 12px;
  margin-bottom: 60px;
`;

export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

export const ServiceCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #1a73e8;
`;

export const CaseStudiesSection = styled.section`
  margin-bottom: 60px;
`;

export const CaseStudiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
`;

export const CaseStudyItem = styled.div``;

export const CaseStudyTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #1a73e8;
`;

export const CaseStudyText = styled.p`
  line-height: 1.6;
  color: #555;
`;

export const GlobalPresenceSection = styled.section`
  background: #f9f9f9;
  padding: 50px 30px;
  border-radius: 12px;
  text-align: center;
`;

export const GlobalPresenceText = styled.p`
  font-size: 1.2rem;
  color: #555;
`;

export const HeroSectionBlack = styled.section`
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 80px 20px;
  margin-bottom: 60px;
  border-radius: 12px;
`;

export const HeroTitleWhite = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  line-height: 1.3;
  color: #fff;
  font-weight: 700;
`;

export const SourceTextWhite = styled.p`
  font-style: italic;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-top: 10px;
`;

export const AboutUsWithImageSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  margin-bottom: 100px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
`;

export const AboutUsContent = styled.div`
  flex: 1;
  min-width: 300px;
`;

export const ClickableSectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #1a73e8;
  cursor: pointer;
  display: inline-block;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #0d47a1;
    transform: translateX(5px);
  }
`;

export const AboutUsMoreText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  margin-top: 15px;
`;

export const AboutUsImageWrapper = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    height: auto;
  }
`;

export const ServiceDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  color: #666;
  margin-top: 10px;
`;

export const CaseStudiesWithImageSection = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 60px;
  margin-bottom: 100px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
`;

export const CaseStudiesContent = styled.div`
  flex: 1;
  min-width: 300px;
`;

export const CaseStudiesImageWrapper = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  img {
    max-width: 100%;
    height: auto;
  }
`;

export const PageBackground = styled.div`
  background-color: #FFA500; /* Cor laranja */
  min-height: 100vh;
`;

export const ClickableSectionTitleWhite = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #e0e0e0;
    transform: translateX(5px);
  }
`;

export const AboutUsTextWhite = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #fff;
  max-width: 800px;
`;

export const AboutUsMoreTextWhite = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 15px;
`;

export const SectionTitleWhite = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #fff;
`;

export const CaseStudyTitleWhite = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #fff;
`;

export const CaseStudyTextWhite = styled.p`
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
`;

export const GlobalPresenceOrangeSection = styled.section`
  background-color: #2E8B57; 
  padding: 50px 30px;
  border-radius: 12px;
  text-align: center;
  color: #fff;
    
  animation: shake 0.5s ease-in-out infinite;
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
    20%, 40%, 60%, 80% { transform: translateX(2px); }
  }
`;

export const GlobalPresenceTextWhite = styled.p`
  font-size: 1.2rem;
  color: #fff;
  font-weight: 500;
`;

export const StatNumberWhite = styled.h2`
  font-size: 3rem;
  color: #fff;
  margin: 0 0 10px 0;
  font-weight: 700;
`;

export const StatLabelWhite = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: #fff;
`;

export const ServicesSectionGreen = styled.section`
  background: #228B22; /* ForestGreen - pode ajustar a tonalidade se preferir */
  padding: 50px 30px;
  border-radius: 12px;
  margin-bottom: 60px;
`;

export const SectionTitleWhiteCenter = styled.h2`
  font-size: 2rem;
  margin-bottom: 30px;
  color: #fff;
  text-align: center;
`;

export const ServiceCardGreen = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const ServiceTitleWhite = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #fff;
  font-weight: 600;
`;

export const ServiceDescriptionWhite = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 10px;
`;