import React, { Component } from 'react';
import './App.css';
import PokemonCollectionContainer from './PokemonCollectionContainer/PokemonCollectionContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PokemonExpandedCardContainer from './PokemonExpandedCardContainer/PokemonExpandedCardContainer';

export const getPokemonCollection = async () => {
  return await fetch('https://pokeapi.co/api/v2/pokemon?limit=9');
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorData: null,
      loading: true,
      pokemonLinkKeyValuePairs: null
    };
  }

  componentDidMount() {
    this.loadPokemonCollection();

  }

  loadPokemonCollection = async () => {
    try {
      const pokeApiResponse = await getPokemonCollection();

      const pokeApiResponseBody = await pokeApiResponse.json();
      this.setState({
        pokemonLinkKeyValuePairs: pokeApiResponseBody.results
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
    const { loading, error, pokemonLinkKeyValuePairs } = this.state;

    if (loading) {
      content = <p className='loading'>One moment please...</p>;
    } else if (!loading && error) {
      content = <p className='error'>Oops, there was an error getting data!</p>;
    } else if (!loading && !error && pokemonLinkKeyValuePairs) {
      content = <PokemonCollectionContainer pokemonLinkKeyValuePairs={pokemonLinkKeyValuePairs} />;
    }
    return (
      <Router>
        <div className='App'>
          <Route
            path='/'
            exact
            render={() => {
              return <div className='content'>{content}</div>;
            }}
          />
          <Route path='/:name' component={PokemonExpandedCardContainer} />
        </div>
      </Router>
    );
  }
}

export default App;
