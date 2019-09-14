import React, { Component } from 'react';
import PokemonExpandedCard from '../PokemonExpandedCard/PokemonExpandedCard';

export const getSinglePokemon = async pokemonId => {
  return await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
};

export const validPokemonIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default class PokemonExpandedCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorData: null,
      loading: true,
      pokemonData: null
    };
  }

  async componentDidMount() {
    const pokemon = this.props.match.params.name;
    window.fathom('trackPageview', { page: `/${pokemon}` });

    try {
      const pokeApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

      const pokemonData = await pokeApiResponse.json();

      this.setState({
        pokemonData
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
  }
  render() {
    let content = null;

    const { loading, error, pokemonData } = this.state;

    if (loading) {
      content = <p className='loading'>One moment please...</p>;
    } else if (!loading && error) {
      content = <p className='error'>Oops, there was an error getting data!</p>;
    } else if (!loading && !error && pokemonData) {
      content = (
        <PokemonExpandedCard pokemonData={pokemonData} handleViewAnotherPokemon={this.handleViewAnotherPokemon} />
      );
    }

    return content;
  }
}
