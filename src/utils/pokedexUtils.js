
// NOT WORKING

export function spriteURLConcat(spriteURL,pokemon) {
    function spriteURLConcat() {
        if ( spriteURL === '' ) {
            // Use a callback function to access the previous state
            prevSpriteURL => {
              // Create a new variable to store the new state
              let newSpriteURL = prevSpriteURL + 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
              if (spriteBack === true) {
                newSpriteURL = newSpriteURL + 'back/';
              }
              if (spriteShiny === true) {
                newSpriteURL = newSpriteURL + 'shiny/';
              }
              newSpriteURL = newSpriteURL + pokemon.id + '.png';
              // Return the new state
              return newSpriteURL;
            };
          }
    }
}