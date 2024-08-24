import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import startIconUrl from '../assets/start-icon.png';
import endIconUrl from '../assets/end-icon.png';
import vesselIconUrl from '../assets/vessel-icon.png';
import './MapComponent.css';

const MapComponent = ({ start, end, speed }) => {
  const [position, setPosition] = useState(start);
  const [path, setPath] = useState([start]);
  const [angle, setAngle] = useState(0);

  const startIcon = new L.Icon({
    iconUrl: startIconUrl,
    iconSize: [40, 40],
    iconAnchor: [15, 15], 
  });

  const endIcon = new L.Icon({
    iconUrl: endIconUrl,
    iconSize: [40, 40],
    iconAnchor: [15, 15], 
  });

  const vesselIcon = new L.Icon({
    iconUrl: vesselIconUrl,
    iconSize: [14, 50],
    iconAnchor: [15, 15], 
    className: 'rotating-icon',
  });

  useEffect(() => {
    const totalSteps = 20;
    const latStep = (end[0] - start[0]) / totalSteps;
    const lonStep = (end[1] - start[1]) / totalSteps;

    const interval = setInterval(() => {
      setPosition((prev) => {
        const newLat = prev[0] + latStep;
        const newLon = prev[1] + lonStep;
        const newPosition = [newLat, newLon];
        setPath((prevPath) => [...prevPath, newPosition]);


        const deltaLat = end[0] - newLat;
        const deltaLon = end[1] - newLon;
        const newAngle = Math.atan2(deltaLon, deltaLat) * (180 / Math.PI);
        setAngle(newAngle);

        if (Math.abs(newPosition[0] - end[0]) < Math.abs(latStep) &&
            Math.abs(newPosition[1] - end[1]) < Math.abs(lonStep)) {
          clearInterval(interval);
          return end;
        }
        return newPosition;
      });
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [start, end]);

  return (
    <>
      <MapContainer center={start} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={start} icon={startIcon} />
        <Marker position={end} icon={endIcon} />
        <Marker 
          position={position} 
          icon={vesselIcon} 
          style={{ transform: `rotate(${angle}deg)` }} 
        />
      </MapContainer>

    
    </>
  );
};

export default MapComponent;
