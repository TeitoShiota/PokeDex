import './App.scss'
import { useEffect, useState } from 'react'; //useeffect kører kode på hjemmesiden når komponenten er loaded, usestate gemme data (vores variabel i react)
import axios from 'axios' //for fetch requests

const searchBtn = document.getElementById('search-btn'); // search button
const inputField = document.getElementById('name-input'); // search field input


const App = () => { 
  const [pokemon, setPokemon] = useState(undefined); //Pokemon stored, state undefined 
  const [search, setSearch] = useState('') //holds what is written in the searchfield

  function getPokemon (id) { //id can either be a name or a number (API accepts both)
    const URL = `https://pokeapi.co/api/v2/pokemon/` + id; //concatunate the URL for the API and the id together
    axios.get(URL) //sends a get request to the API endpoint. fx/i.e the URL we created earlier
      .then((response) => { //when respons comes back pass the respons into an arrow function
        if (response.status != 404){ //checks if the response status is not 404
          setPokemon(response.data); //then takes the response data and sends to this data
        } else { 
          setPokemon(null); //if status is 404 sets Pokemon to null
        }
      })
      .catch((err) => console.error(err)); //catches any errors and prints the error to the console. 
  };
  
  function handleSubmit(event){ //takes event as a peremater (takes the eventdata)
    event.preventDefault(); //prevents page from reloading
    setPokemon(getPokemon(search)); //setPokemon to getPokemon passing through what is inside the searchbar
  };

  function handleChange(event){
    setSearch(event.target.value);//uses the value from the target of the event i.e/fx the text in the searchfield
  };

  useEffect(()=> { //when page loads, this is run
      if (pokemon === undefined){ //checks if pokemon is undefined
        setPokemon(getPokemon(100)); //setsPokemon to getPokemon with id of 100
      }
  }, []);
 
  return (
    <div className="App">
      <header id="logo">
        <a href="index.html">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png" alt="logo"/>
        </a>
      </header>

      <main>
        <form id='searchForm' className="search-container" onSubmit={handleSubmit}>
          <input id="name-input" name='search' type="text" value={search} onChange={handleChange} placeholder="Name / id" />
          
          <div type="submit" id="search-btn" className="ball-container" role="button" aria-pressed="false" tabIndex="0" onClick={handleSubmit}>
            <div className="upper-half-ball"></div>
            <div className="bottom-half-ball"></div>
            <div className="center-ball"></div>
            <div className="center-line"></div>
          </div>
        </form>
        
        { pokemon != null && //shortcirquits if pokemon is null, otherwise displays information (as it will be false if the first statement is not true (because &&))
        
        <section className='pokedex'> {/*?. null operator ekisterer den eller gør ikke noget.*/}
          
          {/* Left */}
          <section className='panel left'>

            <div className='pokemon-name screen'>
              <p>{pokemon?.name}</p> 
              <p>No.{pokemon?.id}</p>
            </div>

            <div>
              <img src={pokemon?.sprites.front_default} alt="{pokemon?.name}" className='pokemon-sprite' />
            </div>

            {/* <div className='pokemon-sprite'>
              <img src={pokemon?.sprites.front_default} alt="{pokemon?.name}"/>
              <img src={pokemon?.sprites.back_default} alt="{pokemon?.name}" />
            </div> */}


          <div>
            <p>Type</p>
            <ul>
              {pokemon?.types.map((info) => (
                <li>
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
            <ul>
              {pokemon?.held_items.map((info) => (
                <li>
                  {info.item.name} <br /> {/* if none add text none *!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!/}
                  {/* {info.version_details.name} */}
                </li>
                )) //stats er et array (af data [] på siden), så vi mapper den. ({} objekt)
              }
            </ul>
          </div>
            <div>
              <b>Base stats</b>
              <ul>
                {pokemon?.stats.map((info) => (
                  // <li key={info.id}>
                  <li>
                    {info.stat.name} {info.base_stat}
                  </li>
                  )) //stats er et array (af data [] på siden), så vi mapper den. ({} objekt)
                }
              </ul>
            </div>
          </section>

        </section>}
        {pokemon == null && <p>Pokémon does not exist</p>} {/*shortcirquits if pokemon is not null, displays the pp*/}

      </main>

      <footer>
        
      </footer>
    </div> 
  );
}

export default App