import styled from "styled-components";

export const Container = styled.div`
  button {
    text-transform: uppercase;
    padding: 12px 25px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-weight: 700;
    letter-spacing: 0.071em;
    font-size: 14px;
    transition: all ease-in-out 0.2s;

    &:hover {
      transform: scale(1.1);
    }
  }
`