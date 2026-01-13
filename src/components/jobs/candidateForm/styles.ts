import styled from 'styled-components'

export const Container = styled.div`
  margin: 40px auto;
  max-width: 500px;
  width: 90%;
  background-color: inherit;
  box-sizing: border-box;

  form {
    font-family: Montserrat, arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: inherit;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    margin: 30px auto;
    width: 95%;
  }
  
  @media (max-width: 480px) {
    margin: 20px auto;
    width: 95%;
    max-width: 400px;
  }
`;

export const Title = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 30px;
  
  h1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    color: #021F3E;
    margin: 0 0 15px 0;
    text-align: center;
    font-weight: 600;
    line-height: 1.3;
  }

  .line {
    display: block;
    width: 80px;
    height: 3px;
    background: #021F3E;
    margin: 0 auto;
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 1.6rem;
    }
    
    margin-bottom: 25px;
  }
  
  @media (max-width: 480px) {
    h1 {
      font-size: 1.4rem;
      margin-bottom: 10px;
    }
    
    .line {
      width: 60px;
    }
    
    margin-bottom: 20px;
  }
`;

export const Data = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  gap: 8px;
  background-color: inherit;
  box-sizing: border-box;

  input {
    font-family: Montserrat, arial, sans-serif;
    margin-top: 8px;
    outline: none;
    padding: 14px 16px;
    width: 100%;
    border: 1px solid #E2E2E2;
    border-radius: 8px;
    background-color: #fff;
    font-size: 15px;
    transition: all 0.3s ease;
    box-sizing: border-box;

    &:focus {
      border-color: #021F3E;
      box-shadow: 0 0 0 2px rgba(2, 31, 62, 0.1);
    }

    &::placeholder {
      color: #666;
    }
  }

  input:hover {
    border-color: #021F3E;
  }

  p {
    color: #e74c3c;
    font-size: 12px;
    margin: 2px 0 0 0;
    width: 100%;
    text-align: left;
    font-weight: 500;
    padding-left: 5px;
    min-height: 16px;
  }

  @media (max-width: 480px) {
    input {
      padding: 12px 14px;
      margin-top: 6px;
      font-size: 14px;
    }
    
    gap: 6px;
  }
`;

export const FirstButton = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
  box-sizing: border-box;
  
  button {
    width: 100%;
    max-width: 180px;
    height: 48px;
    background-color: #021F3E;
    color: #FFF;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    outline: none;
    cursor: pointer;
    border: none;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #0056b3;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(2, 31, 62, 0.3);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
    
    &.sending {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
  
  @media (max-width: 480px) {
    margin-top: 25px;
    margin-bottom: 15px;
    
    button {
      height: 50px;
      max-width: 100%;
      font-size: 15px;
    }
  }
`;

// Mantenha os outros estilos conforme necessário...
export const GooglePrivacy = styled.div`
  .privacidade {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Montserrat, Arial, sans-serif;
    font-size: 0.69rem;
    color: #595959;
    margin-top: 40px;
    margin-bottom: 35px;
    text-decoration: none; 
    padding: 5px;
    text-align: center;

    @media (max-width: 460px) {
      margin-top: 10px;
    }
  }
`; 

export const WhatsappButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SecondButton = styled.div`
  .mensagem {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 12.5rem;
    height: 3.125rem;
    background-color: #021F3E;
    color: #FFF;
    border-radius: 0.625rem;
    border: none;
    font-size: 0.94rem;
    outline: none;
    cursor: pointer;
    padding: 0 15px;
    margin: 30px;
  }

  button:hover {
    transition: 0.8s;
    transform: scale(1.05);
  }
`;

export const Name = styled.div`
  .name {
    text-align: center;
    color: #1B1B1B;
    font-size: 1.38rem;
    font-weight: 400;
    margin: 10px;
  }
`;

export const Address = styled.div`
  .endereco {
    color: #021F3E;
    font-size: 1.25rem;
    margin: 25px 0 10px 0;
    text-align: center;
  }
`;

export const Email = styled.div`
  max-width: 100%;

  a {
    display: flex;
    align-content: center;
    justify-content: center;
    color: #021F3E;
    text-decoration: none;
    max-width: 100%;   
    padding: 10px;
    
    @media (max-width: 460px) {
      font-size: 12px;
    }
  }
`;

export const Map = styled.div`
  margin-top: 2.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0;
  padding: 10px;
  border: none;
`;

export const Button = styled.button`
  width: 50px;
  border: none;
  font-size: 60px;
  margin-top: 60px;
  background-color: transparent;
  color: green;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto 0 auto;
`;