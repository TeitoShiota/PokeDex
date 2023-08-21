// Pokemon API
// API for Pokemon

import axios from 'axios';

export async function getAllPokemons() {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    return response.data.results;
}


export function getPokemonImage(id) {
    return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png';
}

export const getPokemon = async (id) => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + id);
    return response.data;
}
