import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { Home } from './pages/Home/Home';
import { Auth } from './pages/Auth/Auth';
import { NotFound } from './pages/NotFound';
import { Events } from './pages/Events/Events';
import { Bookings } from './pages/Bookings/Bookings';
import { NavBar } from './components/NavBar/NavBar';

import { StyleWrapper } from './styles';

const Container = styled.div`
  margin: 5rem 2rem 2rem 2rem;
`;

export const App = () => {
  return (
    <>
      <StyleWrapper />
      <BrowserRouter>
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
      </BrowserRouter>
    </>
  );
};
