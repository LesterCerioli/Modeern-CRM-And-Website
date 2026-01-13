import React from "react";
import * as S from "./styles";

export const TimelineSection: React.FC = () => {
  const timelineItems = [
    { 
      year: "2003", 
      title: "Company Founded", 
      description: "Started operations with a vision to revolutionize the tech industry" 
    },
    { 
      year: "2016", 
      title: "Migration for Cloud becoming in a fully-remote Business", 
      description: "Migrated everything infrastructure for Cloud and our teams started to work fully-remote" 
    },
    { 
      year: "2018", 
      title: "Added a new business branch: Software Solutions development from own digital products", 
      description: "We started to develop own digital products as service to grow more our revenue and scale our business" 
    },
    { 
      year: "2024", 
      title: "Own AI Solutions implementations", 
      description: "Started to provide AI solutions services for companies" 
    },
    { 
      year: "2025", 
      title: "Own Datacenters implementations", 
      description: "Started to build new datacenters on more than 40 countries." 
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