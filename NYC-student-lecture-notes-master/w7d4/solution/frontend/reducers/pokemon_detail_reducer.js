import { merge } from 'lodash';

import {
  RECEIVE_SINGLE_POKEMON,
  RECEIVE_NEW_POKEMON
 } from '../actions/pokemon_actions';

const _defaultPokemon = {
  image_url: '',
  name: '',
  poke_type: '',
  attack: '',
  defense: '',
  moves: [],
  items: []
};

export default (state = _defaultPokemon, action) => {
  switch(action.type){
    case RECEIVE_SINGLE_POKEMON:
    case RECEIVE_NEW_POKEMON:
      return merge({}, action.pokemon);
    default:
      return state;
  }
};
