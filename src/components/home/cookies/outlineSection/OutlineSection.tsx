import React from "react";
import * as S from "./styles";
import { Target, Eye, Gem, Rocket, Users, Shield } from "lucide-react";

export const OutlineSection: React.FC = () => {
  const outlineItems = [
    {
      icon: <Target size={40} />,
      title: "Our Mission",
      description: "To empower businesses with cutting-edge technology solutions that drive growth, efficiency, and innovation",
      color: "#667eea"
    },
    {
      icon: <Eye size={40} />,
      title: "Our Vision",
      description: "To be the leading technology partner for businesses across North America, recognized for excellence and innovation",
      color: "#764ba2"
    },
    {
      icon: <Gem size={40} />,
      title: "Core Values",
      description: "Integrity, Innovation, Excellence, Collaboration, and Customer Success guide everything we do",
      color: "#f56565"
    },
    {
      icon: <Rocket size={40} />,
      title: "Our Strategy",
      description: "Leverage emerging technologies and deep industry expertise to deliver transformative solutions",
      color: "#48bb78"
    },
    {
      icon: <Users size={40} />,
      title: "Our Team",
      description: "Expert professionals with diverse backgrounds and a shared passion for technology innovation",
      color: "#ed8936"
    },
    {
      icon: <Shield size={40} />,
      title: "Our Promise",
      description: "Uncompromising quality, reliable support, and measurable results for every client engagement",
      color: "#4299e1"
    },
  ];

  return (
    <S.Container>
      <S.Title>Who We Are</S.Title>
      <S.Subtitle>The foundation of our success and commitment to excellence</S.Subtitle>
      
      <S.GridContainer>
        {outlineItems.map((item, index) => (
          <S.OutlineCard key={index}>
            <S.IconWrapper style={{ color: item.color }}>
              {item.icon}
            </S.IconWrapper>
            <S.CardTitle>{item.title}</S.CardTitle>
            <S.CardDescription>{item.description}</S.CardDescription>
          </S.OutlineCard>
        ))}
      </S.GridContainer>
    </S.Container>
  );
};