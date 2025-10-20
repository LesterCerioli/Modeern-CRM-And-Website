import styled from "styled-components"
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export const Container = styled.footer`
    position: fixed; 
    bottom: 0;
    left: 0; 
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 100%;
    height: 80px; /* Reduzido de 140px para 80px */
    background: #382EC4;  
    @media (max-width: 425px) {
        position: relative;
      }
`

export const SpanContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; /* Alterado de space-around para center */
    align-items: center;
    width: 100%;
    height: 60%; /* Ajustado para melhor distribuição */
    gap: 4px; /* Adicionado gap para espaçamento */
`

export const Brand = styled.span`
    color: #FFF;
    font-family: Montserrat;
    font-size: 16px; /* Reduzido de 20px para 16px */
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`

export const Copyright = styled.span`
    color: #FFF;
    font-family: Montserrat;
    font-size: 14px; /* Reduzido de 18px para 14px */
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const SocialsContainer = styled.div`
    display: flex;
    height: 40%;
    width: 80px;
    justify-content: space-around;
    align-items: center;
`

export const Socials = styled.a`
    text-decoration: none;
`

export const LinkedinIcon = styled(FaLinkedin)`
    font-size: 20px; /* Reduzido de 24px para 20px */
    color: white;
`;

export const GithubIcon = styled(FaGithubSquare)`
    font-size: 20px; /* Reduzido de 24px para 20px */
    color: white;
`;