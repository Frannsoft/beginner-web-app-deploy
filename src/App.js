import React, { Component } from 'react';
import './App.css';
import PokemonContainer from './PokemonContainer/PokemonContainer';

export const getPokemonData = async pokemonId => {
  return await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
};

export const getRandomPokemonId = validPokemonIds => {
  return validPokemonIds[Math.floor(Math.random() * validPokemonIds.length)];
};

export const validPokemonIds = [...Array(150).keys()]; //the best generation

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorData: null,
      loading: true,
      pokemonData: null
    };
  }

  async componentDidMount() {
    await this.handleViewAnotherPokemon();
  }

  handleViewAnotherPokemon = async () => {
    try {
      const pokemonId = getRandomPokemonId(validPokemonIds);
      const pokeApiResponse = await getPokemonData(pokemonId);

      const pokeApiResponseBody = await pokeApiResponse.json();

      this.setState({
        pokemonData: pokeApiResponseBody
      });
    } catch (error) {
      console.error(error);
      this.setState({
        errorData: error
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    let content = null;

    const { loading, error, pokemonData } = this.state;

    if (loading) {
      content = <p className='loading'>One moment please...</p>;
    } else if (!loading && error) {
      content = <p className='error'>Oops, there was an error getting data!</p>;
    } else if (!loading && !error && pokemonData) {
      content = <PokemonContainer pokemonData={pokemonData} handleViewAnotherPokemon={this.handleViewAnotherPokemon} />;
    }
    return (
      <div className='App'>
        <div className='content'>{content}</div>
      </div>
    );
  }
}

export default App;
