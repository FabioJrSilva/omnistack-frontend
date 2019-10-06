import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './style.css';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const userId = localStorage.getItem('user_id');
      console.log(userId);
      const response = await api.get('/dashboard', {
        headers: { user_id: userId }
      });
      console.log(response.data);

      setSpots(response.data);
    }

    loadSpots();
  }, []);
  return (
    <>
      <ul className="spot-list">
        {spots.map((spot) => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$ ${spot.price}` : 'Gratuito!'}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
