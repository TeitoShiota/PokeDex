import './SpriteControls.scss'

export default function SpriteControls() {
    return(
        <section id='sprite-controls'>
            <button className='sprite-control sprite-controls-gender'>Gender</button>
            <button className='sprite-control sprite-controls-shiny'>SHINY</button>
            <button className='sprite-control sprite-controls-flip'>Flip</button>
        </section>
    )
}