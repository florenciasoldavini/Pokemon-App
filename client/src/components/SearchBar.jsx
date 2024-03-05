import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage, getPokemons, setGlobalFilters } from '../redux/actions';
import { useEffect, useState } from "react";

const SearchBar = () => {
    const dispatch = useDispatch();
    const types = useSelector(state => state.types);
    const globalFilters = useSelector(state => state.filters);

    useEffect(() => {
        setFilters(globalFilters)
    }, [])

    const [filters, setFilters] = useState({
        sort: '',
        origin: '',
        type: '',
        name: ''
    });

    const handleSelect = (event) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.value,
        });
    };

    const handleFilter = () => {
        dispatch(getPokemons(filters, 12, 0));
        dispatch(setGlobalFilters(filters))
        dispatch(setCurrentPage(1))
    };

    const handleChange = (event) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className='searchbar'>
            <div>
                <input id='search-input' type='search' name='name' value={filters.name} onChange={handleChange} />
                <button className='searchbar-btn' onClick={handleFilter}>Buscar</button>
            </div>
            <div>
                <label className='searchbar-txt'>Ordenar por:</label>
                <select className='search-dropdown' name='sort' value={filters.sort} onChange={handleSelect}>
                    <option>Nombre, A-Z</option>
                    <option>Nombre, Z-A</option>
                    <option>Ataque, menor a mayor</option>
                    <option>Ataque, mayor a menor</option>
                </select>
            </div>
            <div>
                <label className='searchbar-txt'>Filtrar por origen:</label>
                <select className='search-dropdown' name='origin' value={filters.origin} onChange={handleSelect}>
                    <option>Todos</option>
                    <option>Pokemones preexistentes</option>
                    <option >Mis pokemones</option>
                </select>
            </div>
            <div>
                <label className='searchbar-txt'>Filtrar por tipo:</label>
                <select className='search-dropdown' name='type' value={filters.type} onChange={handleSelect}>
                    <option>Todos</option>
                    {
                        types.map((type) => {
                            return <option key={type}>{type}</option>
                        })
                    }
                </select>
            </div>
            <button className='searchbar-btn' onClick={handleFilter}>Aplicar filtros</button>
        </div>
    )
};

export default SearchBar;