import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { Bookings } from './pages/Bookings';
import { Auth } from './pages/Auth';
import { Events } from './pages/Events';
import { Home } from './pages/Home/Home';
import { NavBar } from './components/NavBar';
import { NotFound } from './pages/NotFound';

const Container = styled.div`
  margin: 5rem 2rem 2rem 2rem;
`;

export const App = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth type="login" />} />
          <Route path="/auth/signup" element={<Auth type="signup" />} />
          <Route path="/events" element={<Events />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
};
