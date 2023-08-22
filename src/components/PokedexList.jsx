import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { PokedexContext } from '../contexts/PokedexContext'


export default function PokedexList() {

    const { pokedex, loading, error } = useContext(PokedexContext)
    

    if (loading) {return <h1>Loading...</h1>}
    if (error) {return <h1>Error: {error.message}</h1>}

    return (
        <>
            <h1>Pokedex</h1>
            <ul>
                {pokedex.map((pokemon) => (
                    <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
                        <span>
                            <li>
                                <h2>ID: {pokemon.id} </h2>
                                <h2>{pokemon.name}</h2>
                            </li>
                        </span>
                    </Link>
                ))}
            </ul>

        </>
    )
}