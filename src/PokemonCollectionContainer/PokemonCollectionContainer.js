import React, { Component } from 'react';
import './PokemonCollectionContainer.css';
import PokemonBasicCard from '../PokemonBasicCard/PokemonBasicCard';

export default class PokemonCollectionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorData: null,
      loading: true,
      pokemonDataCollection: null
    };
  }

  async componentDidMount() {
    try {
      const { pokemonLinkKeyValuePairs } = this.props;

      const pokemonDataPromises = pokemonLinkKeyValuePairs.map(pokemonDataKvp => {
        return fetch(pokemonDataKvp.url);
      });

      await Promise.all(pokemonDataPromises);

      const pokemonResponseJsonPromises = await pokemonDataPromises.map(async response => {
        return (await response).json();
      });

      const pokemonDataCollection = await Promise.all(pokemonResponseJsonPromises);

      this.setState({
        pokemonDataCollection
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

  renderPokemonCards = pokemonDataCollection => {
    return pokemonDataCollection.map((pokemonData, index) => {
      return <PokemonBasicCard key={index} pokemonData={pokemonData} />;
    });
  };

  render() {
    let content = null;

    const { loading, error, pokemonDataCollection } = this.state;

    if (loading) {
      content = <p className='loading'>One moment please...</p>;
    } else if (!loading && error) {
      content = <p className='error'>Oops, there was an error getting data!</p>;
    } else if (!loading && !error && pokemonDataCollection) {
      content = <div className='cards'>{this.renderPokemonCards(pokemonDataCollection)}</div>;
    }

    return content;
  }
}
