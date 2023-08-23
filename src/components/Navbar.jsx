import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { PokedexContext } from '../contexts/PokedexContext'

export default function Navbar() {
    const { checkPokemonInPokedex } = useContext(PokedexContext)
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        // Check if the pokemon is in the pokedex
        const result = checkPokemonInPokedex(search.toString());
        // If it is, redirect to the pokemon's page
        console.log(result);
        if (result.isInDex === true) {
            console.log("Redirecting to /pokemon/" + result.id);
            navigate("/pokemon/" + result.id);
            return;
        } else if (result.isInDex === false) {
            // If it isn't, throw an error
            alert("Pokemon not found. Please try again.");
            return;
        }
        else{
            
        }
    }

    function handleChange (event) {
        // Set the search value to the value of the input
        setSearch(event.target.value);
    }

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/pokedex">Pokedex</Link>
                    </li>
                </ul>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="search" id="search" value={search} onChange={handleChange} placeholder="Name / id" />
                    <button type='submit'>
                        <span><p>Search</p></span>
                    </button>
                </form>
            </nav>
        </>
    );
}