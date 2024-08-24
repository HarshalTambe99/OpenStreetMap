import React from 'react';

const Header = ({ start, end, speed }) => {
  return (
    <div style={styles.headerContainer}>
      <div style={styles.coordinateBox}>
        <h4>Starting</h4>
        <p>Lat: {start[0]}</p>
        <p>Long: {start[1]}</p>
      </div>
      <div style={styles.speedBox}>
        <h4>Speed</h4>
        <p>{speed} kmph</p>
      </div>
      <div style={styles.coordinateBox}>
        <h4>Ending</h4>
        <p>Lat: {end[0]}</p>
        <p>Long: {end[1]}</p>
      </div>
    </div>
  );
};

const styles = {
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #ccc',
    marginBottom: '10px',
  },
  coordinateBox: {
    textAlign: 'center',
  },
  speedBox: {
    textAlign: 'center',
  },
};

export default Header;
