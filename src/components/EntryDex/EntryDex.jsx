import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

// Context Imports
import { PokedexContext } from "../../contexts/PokedexContext";

// Component Imports
import Sprite from "../Sprite/Sprite";
import SpriteControls from "../SpriteControls/SpriteControls";

// Style Imports
import './EntryDex.scss'

export default function EntryDex() {
    // Contexts for Pokedex
    const { pokedex, getAdditionalInfo, loading, error } = useContext(PokedexContext);

    // Get the id from the url
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
            { pokemon != null && //shortcirquits if pokemon is null, otherwise displays information (as it will be false if the first statement is not true (because &&))        
                <section className='pokedex'> {/*?. null operator ekisterer den eller gør ikke noget.*/}

                  {/* Left */}
                  <section className='panel left'>

                    <div className='pokemon-name screen'>
                      <p>{pokemon?.name}</p> 
                      <p>No.{pokemon?.id}</p>
                    </div>

                    <Sprite pokemon={pokemon} />
                    {/* <div>
                      <img src={spriteURL} alt={'Picture of ' + pokemon?.name} className='pokemon-sprite' />
                    </div> */}

                    {/* <div className='pokemon-sprite'>
                      <img src={pokemon?.sprites.front_default} alt="{pokemon?.name}"/>
                      <img src={pokemon?.sprites.back_default} alt="{pokemon?.name}" />
                    </div> */}

                
                  <div className="type-list">
                    <p className="panel-header">Type</p>
                    <ul className="type-box">
                      {pokemon?.types.map((info) => (
                        <li key={info.type.name} className={"type " + info.type.name}>
                          {info.type.name}
                        </li>
                        )) //stats er et array (af data [] på siden), så vi mapper den. ({} objekt)
                      }
                    </ul>
                  </div>
                  
                    <div>
                      <p><b>Height:</b> {pokemon?.height} </p>
                      <p><b>Weight:</b> {pokemon?.weight} </p>
                    </div>
                  </section>
                  
                 {/* Divider */}
                <div className='divider'>
                  <div className='gap'></div>
                  <div className='hinge'></div>
                  <div className='gap'></div>
                  <div className='hinge'></div>
                  <div className='gap'></div>
                  <div className='hinge'></div>
                  <div className='gap'></div>
                </div>
                  
                 {/* Right */}
                  <section className='panel right'>
                  
                  <div>
                    <b>Abilities</b>
                    <ul>
                      {pokemon?.abilities.map((info) => (
                        <li>
                          {info.ability.name} <br />
                          {info.is_hidden && <i> Hidden ability</i>}
                        </li>
                        )) //stats er et array (af data [] på siden), så vi mapper den. ({} objekt)
                      }
                    </ul>
                  </div>
                  
                  <div>
                    <p>Location</p>
                    {pokemon?.location_area_encounters}
                  </div>
                  
                  
                  <div>
                    <b>Held Items</b>
                    { pokemon?.held_items.lenght < 0 ? 
                    <ul>
                      {pokemon?.held_items.map((info) => (
                        <li>
                          {info.item.name} <br /> 
                          {/* {info.version_details.name} */}
                        </li>
                        )) //stats er et array (af data [] på siden), så vi mapper den. ({} objekt)
                      }
                    </ul> : <p>None</p> }
                  </div>
                    <div>
                      <b>Base stats</b>
                      <ul>
                        {pokemon?.stats.map((info) => (
                          <li key={info.id}>
                            {info.stat.name} {info.base_stat}
                          </li>
                          )) //stats er et array (af data [] på siden), så vi mapper den. ({} objekt)
                        }
                      </ul>
                    </div>
                  </section>

            </section>}
            {pokemon == null && <p>Pokémon does not exist</p>} {/*shortcirquits if pokemon is not null, displays the pp*/}

        </>
    );
}