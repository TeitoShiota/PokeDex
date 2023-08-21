export default function PokedexEntry({ pokemon }) {
    getAdditionalInfo(pokemon);
    return (
        <li>
            <h2>ID: {pokemon.id} </h2>
            <h2>{pokemon.name}</h2>
        </li>
    )
}
