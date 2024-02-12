import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { NotFound } from './pages/NotFound';
import { StyleWrapper } from './styles';

export const App = () => {
  return (
    <>
      <StyleWrapper />
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/auth" Component={Auth} />
          <Route path="/events" Component={null} />
          <Route path="/bookings" Component={null} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
