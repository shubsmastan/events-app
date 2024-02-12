import { useState } from 'react';
import eventLogo from '/event.png';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={eventLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Events Booking App</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {count} events available to book!
        </button>
      </div>
    </>
  );
}

export default App;
