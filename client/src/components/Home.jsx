import NavBar from "./NavBar";
import Cards from "./Cards";
import Pagination from "./Pagination";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPokemons, getTypes } from "../redux/actions";

const Home = () => {
    const dispatch = useDispatch();
    const pokemons = useSelector(state => state.pokemons);
    const filters = useSelector(state => state.filters);
    const currentPage = useSelector(state => state.currentPage);

    console.log(currentPage);

    useEffect(() => {
        dispatch(getPokemons(filters, 12, currentPage * 12 - 12));
        dispatch(getTypes());
    }, [])


    return (
        <div className='page' id='home-page'>
            <NavBar />
            {pokemons.length === 0 && <h1 className='not-found-txt'>No se encontraron pokemones con los parámetros especificados</h1>}
            <Cards pokemons={ pokemons }/>
            <Pagination />
        </div>
    )
};

export default Home;