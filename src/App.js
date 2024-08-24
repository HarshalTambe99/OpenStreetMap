import React from 'react';
import Header from './components/header';
import MapComponent from './components/MapComponent';

function App() {
  const start = [22.1696, 91.4996];
  const end = [22.2637, 91.7159];
  const speed = 20;

  return (
    <div className="App">
      <h1>Vessel Navigation</h1>
      <Header start={start} end={end} speed={speed} />
      <MapComponent start={start} end={end} speed={speed} />
    </div>
  );
}

export default App;
