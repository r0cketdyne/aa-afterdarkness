import React, { Component } from 'react';
import Item from '../items/item';
import LoadingIcon from './loading_icon';

class PokemonDetail extends Component {

  componentDidMount() {
    this.props.fetchSinglePokemon(this.props.params.pokemonId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.pokemonId !== nextProps.params.pokemonId)
      this.props.fetchSinglePokemon(nextProps.params.pokemonId);
  }

  routeIsCorrect() {
    return parseInt(this.props.params.pokemonId) === this.props.pokemonDetail.id
  }

  render() {
    const { pokemonDetail, loading, children } = this.props;
    if (loading) {
      return <section className="pokemon-detail"><LoadingIcon /></section>;
    }
    return (
      <section className="pokemon-detail">
        <ul>
          <img src={ pokemonDetail.image_url } alt={ pokemonDetail.name }/>
            <li>
              <h2>{ pokemonDetail.name }</h2>
            </li>
            <li>Type: { pokemonDetail.poke_type }</li>
            <li>Attack: { pokemonDetail.attack }</li>
            <li>Defense: { pokemonDetail.defense }</li>
            <li>Moves: { pokemonDetail.moves.join(', ') }</li>
        </ul>
        <section className="toys">
          <h3>Items</h3>
          <ul className="toy-list">
            { pokemonDetail.items.map((item) => <Item key={ item.name } item={ item }/>) }
          </ul>
        </section>
        { children }
      </section>
    );
  }
}
export default PokemonDetail;
