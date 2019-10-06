import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post('/sessions', { email, password });
    const { _id } = response.data;

    localStorage.setItem('user_id', _id);

    history.push('/dashboard');
  }

  return (
    <>
      <p>
        Ofereça
        <strong> spots </strong>
        para programadores e encontre
        <strong> talentos </strong>
        para sua empresa!
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL *</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email cadastrado"
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="password">SENHA *</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Senha cadastrada"
          onChange={(event) => setPassword(event.target.value)}
        />

        <button className="btn" type="submit">Entrar</button>
      </form>
    </>
  );
}
