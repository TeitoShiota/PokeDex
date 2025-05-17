import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

// Context Imports
import { PokedexContext } from "../../contexts/PokedexContext";

// Component Imports
import Sprite from "../Sprite/Sprite";
import SpriteControls from "../SpriteControls/SpriteControls";
import NextPrev from "../NextPrev/NextPrev";

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
                  <section className='panel-left'>

                    <div className='pokemon-name screen'>
                      <p>{pokemon?.name}</p> 
                      <p>No.{pokemon?.id}</p>
                    </div>

                    <Sprite pokemon={pokemon} />
                
                    <div className="type-list">
                      <p className="panel-header">Type</p>
                      <ul className="type-box">
                        {pokemon?.types.map((info) => (
                          <li key={info.type.name} className={"type " + info.type.name}>
                            {info.type.name}
                          </li>
                          ))
                        }
                      </ul>
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
                  <section className='panel-right'>
                    
                    <section className="panel-row">
                      <div className="screen stats ">
                        <u>Base stats</u>
                        <ul className="stat-line">
                          {pokemon?.stats.map((info) => (
                            <li key={info.id} className="stat-line-li">
                              <span>{info.stat.name}</span> <span className="stat-line-dots"><hr /></span> <span className="stat-line-right-align">{info.base_stat}</span>
                            </li>
                            ))
                          }
                        </ul>
                      </div>
                    </section>

                    <div className="panel-row blue-buttons">
                      <div className="blue-button"></div>
                      <div className="blue-button"></div>
                      <div className="blue-button"></div>
                      <div className="blue-button"></div>
                      <div className="blue-button"></div>
                      <div className="blue-button"></div>
                      <div className="blue-button"></div>
                      <div className="blue-button"></div>
                      <div className="blue-button"></div>
                      <div className="blue-button"></div>
                    </div>

                  <section className="bottom-right-panel">
                    <div className="screen measurements">
                        <p><b>Height:</b> {pokemon?.height} </p>
                        <p><b>Weight:</b> {pokemon?.weight} </p>
                    </div>

                    <section className="side-panels">
                      <div className="screen abilities">
                          <b>Abilities</b>
                          <ul>
                            {pokemon?.abilities.map((info) => (
                              <li key={info?.ability.name}>
                                {info.ability.name} <br />
                                {info.is_hidden && <i> Hidden ability</i>}
                              </li>
                              )) 
                            }
                          </ul>
                        </div>

                        <div className="screen held-items-panel">
                        <b>Held Items</b>
                        { pokemon?.held_items.lenght < 0 ? 
                        <ul>
                          {pokemon?.held_items.map((info) => (
                            <li>
                              {info.item.name} <br /> 
                              {/* {info.version_details.name} */}
                            </li>
                            )) 
                          }
                        </ul> : <p>None</p> }
                      </div>
                    </section>
                      <NextPrev pokemon={pokemon}  />
                    </section>
                  </section>
            </section>}
            {pokemon == null && <p>Pokémon does not exist</p>} {/*shortcirquits if pokemon is not null, displays the pp*/}
        </>
    );
}