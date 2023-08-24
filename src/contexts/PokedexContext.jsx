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

    function updatePokemon(pokemon) {
        // Copy the pokedex array
        const newPokedex = [...pokedex];
        // Find the index of the pokemon in the array
        const index = newPokedex.findIndex((poke) => poke.id === pokemon.id);
        // Replace the pokemon in the array with the updated pokemon
        newPokedex[index] = pokemon;
        // Set the pokedex state to the new array
        setPokedex(newPokedex);
    }

    function getAdditionalInfo(pokemon){
        console.log('Checking for additional info on:',pokemon.name);
        if (pokemon.height === undefined 
            || pokemon.weight === undefined 
            || pokemon.types === undefined 
            || pokemon.sprites === undefined 
            || pokemon.stats === undefined 
            || pokemon.moves === undefined 
            || pokemon.abilities === undefined 
            || pokemon.species === undefined 
            || pokemon.held_items === undefined 
            || pokemon.game_indices === undefined 
            || pokemon.forms === undefined)
            { 
                console.log("Fetching additional info for " + pokemon.name);
                fetch(pokemon.url)
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
            } else {
                console.log("Additional info already fetched for " + pokemon.name);
            } 
    }

    function checkPokemonInPokedex(search) {
        // Check if the pokemon is in the pokedex
            // If the pokemon is in the pokedex, return true
            if (pokedex.find((poke) => poke.name === search)) {
                return {isInDex: true, id: pokedex.find((poke) => poke.name === search).id};
            } else if (pokedex.find((poke) => poke.id.toString() === search)) {
                return {isInDex: true, id: pokedex.find((poke) => poke.id.toString() === search).id};
            } else {return false;}
    }


    useEffect(() => {
        if (pokedex.length > 0) {
            // if pokedex is already loaded, do nothing
            console.log("Pokedex already loaded");
            return;
        }
        console.log("Loading pokedex");
        // load pokedex from the server
        getAllPokemons()
            .then((data) => {
                // add id to each pokemon
                data = addIdToPekedex(data);
                // set pokedex in state
                console.log(data);
                setPokedex(data);
                // stop loading
                setLoading(false);
            })
            .catch((error) => {
                // set error
                setError(error);
                // stop loading
                setLoading(false);
            });
    }, []);

    return (
      <PokedexContext.Provider value={{ pokedex, loading, error, checkPokemonInPokedex, getAdditionalInfo }}>
        {children}
      </PokedexContext.Provider>
    )
};