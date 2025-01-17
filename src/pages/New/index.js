import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import camera from '../../assets/camera.svg';
import './styles.css';

export default function New({ history }) {
  const [company, setCompany] = useState('');
  const [price, setPrice] = useState('');
  const [techs, setTechs] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => (thumbnail ? URL.createObjectURL(thumbnail) : null), [thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();

    const userId = localStorage.getItem('user_id');
    const data = new FormData();

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('price', price);
    data.append('techs', techs);

    await api.post('/spots', data, {
      headers: { user_id: userId }
    })

    history.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input type="file" onChange={(event) => setThumbnail(event.target.files[0])} />
        <img src={camera} alt="Select img" />
      </label>

      <label htmlFor="company">Empresa*</label>
      <input
        id="company"
        placeholder="Sua empresa"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
      />

      <label htmlFor="techs">
        Tecnologias*
        <span> separado por virgula</span>
      </label>
      <input
        id="techs"
        placeholder="Tecnologias"
        value={techs}
        onChange={(event) => setTechs(event.target.value)}
      />

      <label htmlFor="price">
        Preço
        <span> em branco, se for gratuito</span>
      </label>
      <input
        id="price"
        placeholder="Preço por dia"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />

      <button className="btn" type="submit">Salvar</button>
    </form>
  );
}
