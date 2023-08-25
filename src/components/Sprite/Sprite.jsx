import { useEffect, useState } from 'react';

let spriteObject = {
    turned: false,
    shiny: false,
    female: false, 
    sprites: {
    },
    // When the "activeSprite" method is called,
    // it returns the correct image for the Pokemon
    // based on the "turned" and "shiny" properties.
    activeSprite: function() {
        // If the Pokemon is not turned and not shiny,
        // return the front default sprite.
        if (spriteObject.turned === false && this.shiny === false) {
            return spriteObject.sprites.front_default;
        }
        // If the Pokemon is turned and not shiny,
        // return the back default sprite.
        if (spriteObject.turned === true && this.shiny === false) {
            return spriteObject.sprites.back_default;
        }
        // If the Pokemon is not turned and is shiny,
        // return the front shiny sprite.
        if (spriteObject.turned === false && this.shiny === true) {
            return spriteObject.sprites.front_shiny;
        }
        // If the Pokemon is turned and is shiny,
        // return the back shiny sprite.
        if (spriteObject.turned === true && this.shiny === true) {
            return spriteObject.sprites.back_shiny;
        }
    },
};

export default function Sprite({pokemon}) {

    // states for sprite
    const [sprite, setSprite] = useState(pokemon?.sprites.front_default);


    Object.keys(pokemon.sprites).forEach((key) => {
        spriteObject.sprites[key] = pokemon.sprites[key];
    });

    function spriteToggle(target) {
        // console.log(event.target.name);
        switch (target) {
            case 'turn-switch':
                console.log('turn-switch');
                // if (spriteObject.sprites.back_default !== null) {
                //     spriteObject.turned = !spriteObject.turned;
                // }
                // if (spriteObject.turned === true && pokemon?.sprites.back_shiny !== null) {
                //     spriteObject.turned = !spriteObject.turned;
                // }
                spriteObject.turned = !spriteObject.turned;
                setSprite(spriteObject.activeSprite());
                break;
            case 'shiny-switch':
                console.log('shiny-switch');
                // if (spriteObject.sprites.front_shiny !== null) {
                //     spriteObject.shiny = !spriteObject.shiny;
                // }
                // if (spriteObject.turned === true && pokemon?.sprites.back_shiny !== null) {
                //     spriteObject.shiny = !spriteObject.shiny;
                // }
                spriteObject.shiny = !spriteObject.shiny;
                setSprite(spriteObject.activeSprite());
                break;
            case 'gender-switch':
                console.log('gender-switch')
                // if (spriteObject.sprites.front_female) {
                //     spriteObject.female = !spriteObject.female
                // }
                // if (spriteObject.turned === true && pokemon?.sprites.back_shiny !== null) {
                //     spriteObject.female = !spriteObject.female
                // }
                spriteObject.female = !spriteObject.female
                setSprite(spriteObject.activeSprite());
                break;
        }
    }

    useEffect(() => {
        setSprite(spriteObject.activeSprite());
        console.log(spriteObject)
    }, [spriteObject.turned, spriteObject.shiny, spriteObject.female, pokemon]);

    return (
        <>
            <div className="sprite-container">
                <img src={sprite} alt={'Picture of ' + pokemon?.name} className='pokemon-sprite' />
            </div>
            <section id='sprite-controls'>
                <button name='gender-switch' className='sprite-control sprite-controls-gender' onClick={ () => spriteToggle('gender-switch')}>Gender</button>
                <button name='shiny-switch' className='sprite-control sprite-controls-shiny' onClick={ () => spriteToggle('shiny-switch')}>SHINY</button>
                <button name='turn-switch' className='sprite-control sprite-controls-flip' onClick={ () => spriteToggle('turn-switch')}>Flip</button>
            </section>
        </>
    );
}