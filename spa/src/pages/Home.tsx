import { useState } from 'react';
import eventLogo from '/event.png';
import styled from 'styled-components';

const Logo = styled.img`
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;

  & :hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
`;

const Title = styled.h1`
  font-family: 'Protest Riot';
`;

const Card = styled.div`
  padding: 2em;
`;

export const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <Logo src={eventLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <Title>Event Bookings App</Title>
      <Card className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {count} events available to book!
        </button>
      </Card>
    </>
  );
};
