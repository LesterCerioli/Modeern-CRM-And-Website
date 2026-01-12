import React from "react";
import * as S from "./styles";

export const TimelineSection: React.FC = () => {
  const timelineItems = [
    { 
      year: "2023", 
      title: "Company Founded", 
      description: "Started operations with a vision to revolutionize the tech industry" 
    },
    { 
      year: "2024", 
      title: "Series A Funding", 
      description: "Secured $5M in funding to expand our team and services" 
    },
    { 
      year: "2025", 
      title: "Product Launch", 
      description: "Launched our flagship AI-powered solutions platform" 
    },
    { 
      year: "2026", 
      title: "Growth Milestone", 
      description: "Expanded to serve 500+ clients across North America" 
    },
    { 
      year: "2027", 
      title: "Industry Recognition", 
      description: "Awarded 'Innovation Leader of the Year' by TechForward" 
    },
  ];

  return (
    <S.Container>
      <S.Title>Our Journey</S.Title>
      <S.Subtitle>Milestones that shaped our company's growth</S.Subtitle>
      
      <S.TimelineWrapper>
        {timelineItems.map((item, index) => (
          <S.TimelineItem key={index} $isEven={index % 2 === 0}>
            <S.YearCircle>
              <S.Year>{item.year}</S.Year>
            </S.YearCircle>
            <S.ContentCard>
              <S.ItemTitle>{item.title}</S.ItemTitle>
              <S.ItemDescription>{item.description}</S.ItemDescription>
            </S.ContentCard>
          </S.TimelineItem>
        ))}
      </S.TimelineWrapper>
    </S.Container>
  );
};