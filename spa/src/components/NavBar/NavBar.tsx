import eventLogo from '../../../public/event.png';
import { NavBarItem } from '../NavBarItem/NavBarItem';
import { Header, Branding, Logo, Navigation } from './NavBar.styled';

export const NavBar = () => {
  return (
    <Header>
      <Branding>
        <Logo src={eventLogo} className="logo" alt="Vite logo" />
        <h1>Event Bookings App</h1>
      </Branding>
      <Navigation>
        <NavBarItem link="/" text="Home" />
        <NavBarItem link="/auth" text="Auth" />
        <NavBarItem link="/events" text="Events" />
      </Navigation>
    </Header>
  );
};
