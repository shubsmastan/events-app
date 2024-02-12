import styled from 'styled-components';

export const Header = styled.header`
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.5rem;
  background-color: #082349;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const Branding = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  & h1 {
    font-size: 1.5rem;
    font-family: 'Protest Strike';
  }
`;

export const Logo = styled.img`
  height: 1.5rem;
`;

export const Navigation = styled.nav`
  display: flex;
  gap: 10px;
`;
