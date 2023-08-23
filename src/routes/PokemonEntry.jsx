import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { PokedexContext } from "../contexts/PokedexContext";

export default function PokemonEntry() {
    const { pokedex, getAdditionalInfo, loading, error } = useContext(PokedexContext)
    const { id } = useParams();

    if (loading) {return <h1>Loading...</h1>}
    if (error) {return <h1>Error: {error.message}</h1>}
    // Get the pokemon from the pokedex based on id
    const pokemon = pokedex[id - 1];
    // If the pokemon doesn't exist, return an error
    if (pokemon === undefined) {return <h1>Error: Pokemon not found</h1>}
    // If the pokemon doesn't have additional info, fetch it
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
        || pokemon.forms === undefined    
    ){
        getAdditionalInfo(pokemon);
    }
    if (pokemon.height === undefined){return <h1>Loading Additional data...</h1>}
    return (
        <>
            <h1>{pokemon?.name}</h1>
            <h2>ID: {pokemon?.id}</h2>
            <h2>Height: {pokemon?.height}</h2>
            <h2>Weight: {pokemon?.weight}</h2>
            <h2>Types: {pokemon?.types.map((type) => (
                <li key={type.type.name}>{type.type.name}</li>
            ))}</h2>
            <h2>Abilities: {pokemon?.abilities.map((ability) => (
                <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}</h2>
            <h2>Forms: {pokemon?.forms.map((form) => (
                <li key={form.name}>{form.name}</li>
            ))}</h2>
            <h2>Game Indices: {pokemon?.game_indices.map((game_index) => (
                <li key={game_index.version.name}>{game_index.version.name}</li>
            ))}</h2>
            <h2>Held Items: {pokemon?.held_items.map((held_item) => (
                <li key={held_item.item.name}>{held_item.item.name}</li>
            ))}</h2>
            <h2>Moves: {pokemon?.moves.map((move) => (
                <li key={move.move.name}>{move.move.name}</li>
            ))}</h2>
            <h2>Species: {pokemon?.species.name}</h2>
            <h2>Stats: {pokemon?.stats.map((stat) => (
                <li key={stat.stat.name}>{stat.stat.name}</li>
            ))}</h2>
            <h2>Sprites: {pokemon?.sprites.front_default}</h2>

        </>
    );
}