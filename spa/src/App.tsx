import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { Home } from './pages/Home/Home';
import { Auth } from './pages/Auth';
import { Bookings } from './pages/Bookings';
import { Events } from './pages/Events';
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
          <Route path="/" Component={Home} />
          <Route path="/auth" Component={Auth} />
          <Route path="/events" Component={Events} />
          <Route path="/bookings" Component={Bookings} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
};
