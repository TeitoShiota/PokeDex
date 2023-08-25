import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { PokedexContext } from '../../contexts/PokedexContext'

// Style Imports
import './Navbar.scss'

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
            <nav id="navbar">
                <header id="logo">
                    <Link to="/pokemon/1">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png" alt="logo"/>
                    </Link>
                </header>

                <ul>
                    <li>
                        <Link to="/pokemon/1">Pokédex</Link>
                    </li>
                    <li>
                        <Link to="/pokedex">Pokélist</Link>
                    </li>
                </ul>
                
                <form id='searchForm' className="search-container" onSubmit={handleSubmit}>
                    <input id="name-input" name="search" type="text" value={search} onChange={handleChange} placeholder="Name / id" />
                    <button type='submit' className="hide-button">
                        <div id="search-btn" className="ball-container">
                            <div className="upper-half-ball"></div>
                            <div className="bottom-half-ball"></div>
                            <div className="center-ball"></div>
                            <div className="center-line"></div>
                        </div>
                    </button>  
                </form>
            </nav>
        </>
    );
}