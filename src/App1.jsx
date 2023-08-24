import './App.css'
import { useEffect, useState } from 'react'; //useeffect kører kode på hjemmesiden når komponenten er loaded, usestate gemme data (vores variabel i react)

const App = () => {
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    const fetchPokemon = async () => { //fetchdata //asynkron funktion til at hente dataen, 
      const result = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu/"); //I {id or name} kan fx ændrest il pikachu
      setPokemon(await result.json()); //fra Json til JS 
    } 

    fetchPokemon(); //kalder funktionen
  }, []); //tom dependency array som kun skal kører 1 gang når komponenten er loaded.

  return (
    <div className="App">
      <header id="logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png" alt="logo"/>
      </header>

      <div class="search-container">
      <input id="name-input" type="text" placeholder="Name / id" />

      <div id="search-btn" class="ball-container">
        <div class="upper-half-ball"></div>
        <div class="bottom-half-ball"></div>
        <div class="center-ball"></div>
        <div class="center-line"></div>
      </div>
    </div>

      <section>
        <h1>Name: {pokemon?.name}</h1> 
        <p>Weight: {pokemon?.weight} </p>
        <div>
          <h2>Image</h2>
          <img src={pokemon?.sprites.front_default} alt="{pokemon?.name}" />
          <img src={pokemon?.sprites.back_default} alt="{pokemon?.name}" />
        </div>
        <div>
          <h2>Stats</h2>
          <ul>
            {
                pokemon?.stats.map((info) => (
                <li>
                  Base stat: {info.base_stat} <br />
                  Name: {info.stat.name}
                </li>
                )) //stats er et array (af data [] på siden), så vi mapper den. ({} objekt)
            }
          </ul>
        </div>
      </section>
    </div> //?. null operator ekisterer den eller gør ikke noget.
  );
}
export default App
