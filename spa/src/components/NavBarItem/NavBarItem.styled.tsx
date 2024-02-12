import styled from 'styled-components';

export const NavItem = styled.div`
  & a {
    color: pink;
  }

  & a:hover,
  a.active {
    color: purple;
  }
`;
