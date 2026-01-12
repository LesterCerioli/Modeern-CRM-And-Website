import React from "react";
import * as S from "./styles"; // ← Isso importa do ARQUIVO LOCAL

export const WelcomeSection: React.FC = () => {
  return (
    <S.Container> {/* ← Este S.Container vem do styles.ts NA MESMA PASTA */}
      <S.Content>
        <S.Title>Welcome to Our Company</S.Title>
        {/* ... resto do código */}
      </S.Content>
    </S.Container>
  );
};