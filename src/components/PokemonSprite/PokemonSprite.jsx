import { useEffect, useState } from 'react';

export default function PokemonSprite({pokemon}) {

    // states for pokedex
    const [ spriteURL, setSpriteURL ] = useState('');
    const [ spriteBack, setSpriteBack ] = useState(true);
    const [ spriteShiny, setSpriteShiny ] = useState(false);

    console.log('PokemonSprite: ' + pokemon?.name);

    function spriteToggle(event) {
        event.preventDefault();
        
        switch (event.target.name) {
            case 'spriteBack': 
                if (pokemon?.sprites.back_default) {
                    setSpriteBack(!spriteBack);
                } else {
                    setSpriteBack(false);
                }
                if (spriteShiny === true && pokemon?.sprites.back_shiny) {
                    setSpriteBack(!spriteBack);
                } else {
                    setSpriteBack(false);
                }
             
            case 'spriteShiny': 
                if (pokemon?.sprites.front_shiny) {
                    setSpriteShiny(!spriteShiny);
                } else {
                    setSpriteShiny(false);
                }
                if (spriteBack === true && pokemon?.sprites.back_shiny) {
                    setSpriteShiny(!spriteShiny);
                } else {
                    setSpriteBack(false);
                }
        }
        // concatenate the url for the sprite image based on the pokemon id and the sprite type (front or back) and if it is shiny and set it as the sprite url 
        setSpriteURL('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + spriteBack ? 'back/' : '' + spriteShiny ? 'shiny/' : '' + pokemon.id + '.png');
    }

    function spriteURLConcat() {
        console.log('concatenating spriteurl');
        // Use a callback function to access the previous state
        setSpriteURL(() => {
          // Create a new variable to store the new state
          let newSpriteURL =  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
          if (spriteBack === true) {
            newSpriteURL = newSpriteURL + 'back/';
          }
          if (spriteShiny === true) {
            newSpriteURL = newSpriteURL + 'shiny/';
          }
          newSpriteURL = newSpriteURL + pokemon?.id + '.png';
          // Return the new state
          console.log('newSpriteURL: ' + newSpriteURL);
          return newSpriteURL;
        });
    }

    useEffect(() => {
        spriteURLConcat();
    }, [spriteBack, spriteShiny, pokemon]);

    return (
        <>
            <div className="sprite-container">
                <img src={spriteURL} alt={'Picture of ' + pokemon?.name} className='pokemon-sprite' />
            </div>
        </>
    );
}