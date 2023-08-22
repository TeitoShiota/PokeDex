import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { PokedexContext } from "../contexts/PokedexContext";

export default function PokemonEntry() {
    const { pokedex, getAdditionalInfo, loading, error } = useContext(PokedexContext)
    const { id } = useParams();

    console.log(pokedex);
    console.log(id);

    // Get the pokemon from the pokedex based on id
    const pokemon = pokedex[id - 1];
    console.log(pokemon);

    
    // useEffect(() => {
    //     if (pokemon === undefined && pokemon === null) {
    //         console.log("Pokemon is undefined or null");
    //     } else if (pokemon.height === undefined || pokemon.height === null ) {
    //         getAdditionalInfo(pokemon);
    //     } else {
    //         console.log("Something went wrong");
    //     }
    // }, []);
    if (loading) {return <h1>Loading...</h1>}
    if (error) {return <h1>Error: {error.message}</h1>}
    return (
        <>
            <h1>{pokemon.name}</h1>
        </>
    );
}