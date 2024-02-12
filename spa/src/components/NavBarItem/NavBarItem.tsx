import { NavLink } from 'react-router-dom';

import { NavItem } from './NavBarItem.styled';

interface NavBarItemProps {
  link: string;
  text: string;
}

export const NavBarItem = ({ link, text }: NavBarItemProps) => {
  return (
    <NavItem>
      <NavLink to={link}>{text}</NavLink>
    </NavItem>
  );
};
