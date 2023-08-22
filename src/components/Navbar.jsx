import { Link } from "react-router-dom";

export default function Navbar() {

    function handleSubmit(event) {
        event.preventDefault();
        console.log(event);
    }


    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/pokedex">Pokedex</Link>
                    </li>
                </ul>
                {/* <form onSubmit={handleSubmit}>
                    <input type="text" name="search" id="search" />
                    <div role='button' type='submit' onClick={(e) => handleSubmit(e)}>
                        <span><p>Search</p></span>
                    </div>
                </form> */}
            </nav>
        </>
    );
}