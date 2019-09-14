import React from 'react';
import { Link } from 'react-router-dom';
import './PokemonBasicCard.css';

export default props => {
  const { name, sprites } = props.pokemonData;
  return (
    <Link className='card' to={`/${name}`}>
      <p>{name}</p>
      <img src={sprites.front_default} alt={name} />
    </Link>
  );
};
