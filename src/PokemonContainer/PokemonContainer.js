import React from 'react';
import './PokemonContainer.css';
import PokemonDetail from '../PokemonDetail/PokemonDetail';

export default props => {
  const { pokemonData, handleViewAnotherPokemon } = props;
  return (
    <div className='pokemon'>
      <div className='header'>
        <span>{`#${pokemonData.id}`}&nbsp;</span>
        <span className='name'>{pokemonData.name}</span>
      </div>
      <div className='sprite'>
        <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        <img src={pokemonData.sprites.back_default} alt={pokemonData.name} />
        <img src={pokemonData.sprites.front_shiny} alt={pokemonData.name} />
        <img src={pokemonData.sprites.back_shiny} alt={pokemonData.name} />
      </div>
      <PokemonDetail title='Abilities' items={pokemonData.abilities} itemKey='ability' />
      <PokemonDetail title='Held Items' items={pokemonData.held_items} itemKey='item' />
      <PokemonDetail title='Types' items={pokemonData.types} itemKey='type' />
      <PokemonDetail title='First four moves' items={pokemonData.moves.slice(0, 4)} itemKey='move' />
      <div className='view-another-pokemon'>
        <button onClick={handleViewAnotherPokemon}>View another Pokemon</button>
      </div>
    </div>
  );
};
