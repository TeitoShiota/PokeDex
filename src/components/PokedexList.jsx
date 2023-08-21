import { useContext } from 'react'

import { PokedexContext } from '../contexts/PokedexContext'


export default function Pokedex() {

const { pokedex, updatePokemon, loading, error } = useContext(PokedexContext)
    

    if (loading) {return <h1>Loading...</h1>}
    if (error) {return <h1>Error: {error.message}</h1>}

    return (
        <>
            <h1>Pokedex</h1>
            <button>getAdditionalInfo</button>
            <ul>
                {pokedex.map((pokemon) => (
                    <li key={pokemon.id}>
                        <h2>ID: {pokemon.id} </h2>
                        <h2>{pokemon.name}</h2>
                    </li>
                ))}
            </ul>

        </>
    )
}