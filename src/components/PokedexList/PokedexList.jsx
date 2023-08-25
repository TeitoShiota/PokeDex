import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { PokedexContext } from '../../contexts/PokedexContext'

// Style Imports
import './Pokedexlist.scss'

export default function PokedexList() {

    const { pokedex, loading, error } = useContext(PokedexContext)
    

    if (loading) {return <h1>Loading...</h1>}
    if (error) {return <h1>Error: {error.message}</h1>}

    return (
        <>
        <section className='pokemon-list'>
            <h1>List of Pokémon</h1>
            <ul>
                {pokedex.map((pokemon) => (
                    <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
                        <span className='pokemon-list-items'>
                            <li>
                                <h2>#{pokemon.id} {pokemon.name}</h2>
                            </li>
                        </span>
                    </Link>
                ))}
            </ul>
        </section>
        </>
    )
}