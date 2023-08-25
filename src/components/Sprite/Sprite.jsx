import { useEffect, useState } from 'react';

export default function Sprite({pokemon}) {

    const [sprite, setSprite] = useState(pokemon?.sprites.front_default);

    // states for sprite
    const spriteObject = {
        turned: false,
        shiny: false,
        sprites: {
        },
        // When the "activeSprite" method is called,
        // it returns the correct image for the Pokemon
        // based on the "turned" and "shiny" properties.
        activeSprite: function() {
            // If the Pokemon is not turned and not shiny,
            // return the front default sprite.
            if (this.turned === false && this.shiny === false) {
                return this.sprites.front_default;
            }
            // If the Pokemon is turned and not shiny,
            // return the back default sprite.
            if (this.turned === true && this.shiny === false) {
                return this.sprites.back_default;
            }
            // If the Pokemon is not turned and is shiny,
            // return the front shiny sprite.
            if (this.turned === false && this.shiny === true) {
                return this.sprites.front_shiny;
            }
            // If the Pokemon is turned and is shiny,
            // return the back shiny sprite.
            if (this.turned === true && this.shiny === true) {
                return this.sprites.back_shiny;
            }
        },
        spriteToggle: function spriteToggle(event) {
            event.preventDefault();
            switch (event.target.name) {
                case 'spriteBack':
                    if (this.sprites.back_default) {
                        this.turned = !this.turned;
                    }
                    if (spriteShiny === true && pokemon?.sprites.back_shiny) {
                        this.turned = !this.turned;
                    }
                case 'spriteShiny':
                    if (this.sprites.front_shiny) {
                        this.shiny = !this.shiny;
                    }
                    if (spriteBack === true && pokemon?.sprites.back_shiny) {
                        this.shiny = !this.shiny;
                    }
                case 'gender':
                    if (pokemon?.sprites.front_shiny) {
                        //this.shiny = !this.shiny;
                    }
                    if (spriteBack === true && pokemon?.sprites.back_shiny) {
                       // this.shiny = !this.shiny;
                    }
            }
            
        },
    };

    Object.keys(pokemon.sprites).forEach((key) => {
        spriteObject.sprites[key] = pokemon.sprites[key];
    }
    );

    useEffect(() => {
        setSprite(spriteObject.activeSprite());
    }, [spriteObject,pokemon]);

    return (
        <>
            <div className="sprite-container">
                <img src={sprite ? sprite : '404'} alt={'Picture of ' + pokemon?.name} className='pokemon-sprite' />
            </div>
        </>
    );
}