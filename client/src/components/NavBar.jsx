import SearchBar from "./SearchBar";
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className='navbar'>
            <SearchBar />
            <button className='btn' id='agregar-pokemon-btn'>
                <Link className='txt' id='agregar-pokemon-txt' to='/form'>Agregar un Pokemon</Link>
            </button>
        </div>
    )
};

export default NavBar;