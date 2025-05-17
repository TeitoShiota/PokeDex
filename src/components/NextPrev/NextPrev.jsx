import { useParams, Link } from "react-router-dom"

export default function NextPrev({pokemon}) {
    const { id } = useParams();

    function nextPokemon() {
        let nextPokemon = Number(id) + 1;
        if (nextPokemon > 1281) {
            nextPokemon = 1;
        }
        location.pathname = '/pokemon/' + nextPokemon ;
    }
    function prevPokemon() {
        let prevPokemon = Number(id) - 1;
        if (prevPokemon < 1) {
            prevPokemon = 1281;
        }
        location.pathname = '/pokemon/' + prevPokemon;
    }

    return (
        <section className="next-prev-pokemon">
            <button className="hide-button" onClick={prevPokemon}>
              <div className="button"></div>
            </button>
            <div className="screen num-display">
              {pokemon?.id}
            </div>
            <button className="hide-button" onClick={nextPokemon}>
              <div className="button"></div>
            </button>
        </section>
    )
}