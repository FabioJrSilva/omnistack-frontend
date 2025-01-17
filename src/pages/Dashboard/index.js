import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './style.css';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const userId = localStorage.getItem('user_id');
      const response = await api.get('/dashboard', {
        headers: { user_id: userId }
      });

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

      <Link to="/new">
        <button type="button" className="btn">Cadastrar spots!</button>
      </Link>
    </>
  );
}
