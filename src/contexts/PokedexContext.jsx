// PokemonContexts
// Contexts for Pokemon

import React, { createContext, useState, useEffect } from 'react';

import { getAllPokemons } from '../services/PokeAPI';

function addIdToPekedex(pokedex) {
    return pokedex.map((pokemon, index) => {
        pokemon.id = index + 1;
        return pokemon;
    });
}

export const PokedexContext = createContext();
export const PokedexProvider = ({ children }) => {
    const [pokedex, setPokedex] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getAllPokemons()
            .then((data) => {
                data = addIdToPekedex(data);
                console.log(data);
                setPokedex(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    function updatePokemon(pokemon) {
        const newPokedex = [...pokedex];
        const index = newPokedex.findIndex((poke) => poke.id === pokemon.id);
        newPokedex[index] = pokemon;
        setPokedex(newPokedex);
        console.log(newPokedex);
    }

    function getAdditionalInfo(pokemon){
        return fetch(pokemon.url)
            .then((response) => response.json())
            .then((data) => {
                pokemon.height = data.height;
                pokemon.weight = data.weight;
                pokemon.types = data.types;
                pokemon.sprites = data.sprites;
                pokemon.stats = data.stats;
                pokemon.moves = data.moves;
                pokemon.abilities = data.abilities;
                pokemon.species = data.species;
                pokemon.held_items = data.held_items;
                pokemon.game_indices = data.game_indices;
                pokemon.forms = data.forms;
                updatePokemon(pokemon);
            });
    }

    return (
      <PokedexContext.Provider value={{ pokedex, getAdditionalInfo, loading, error }}>
        {children}
      </PokedexContext.Provider>
    )
};