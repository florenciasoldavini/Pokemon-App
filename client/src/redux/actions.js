import axios from "axios";

export const getPokemons = (filters, limit, offset) => {
    const endpoint = 'http://localhost:3001/pokemons';

    let sortBy = "";
    let orderBy = "";
    let type = "";
    let origin = "";
    let name = null;

    if (filters.sort === "Nombre, A-Z" || filters.sort === "Nombre, Z-A") {
        sortBy = "name"
    } else if (filters.sort === "Ataque, menor a mayor" || filters.sort === "Ataque, mayor a menor") {
        sortBy = "attack"
    };

    if (filters.sort === "Nombre, A-Z" || filters.sort === "Ataque, menor a mayor") {
        orderBy = "asc"
    } else if (filters.sort === "Nombre, Z-A" || filters.sort === "Ataque, mayor a menor") {
        orderBy = "desc"
    };

    if (filters.origin === "Mis pokemones") {
        origin = "DB"
    };

    if (filters.origin === "Pokemones preexistentes") {
        origin = "API"
    };

    if (filters.type && filters.type !== "Todos") {
        type = filters.type
    };

    if (filters.name) {
        name = filters.name
    }

    return async (dispatch) => {
        try {
            const response = await axios.get(endpoint, {
                params: {
                    origin: origin,
                    type: type,
                    sort_by: sortBy,
                    order_by: orderBy,
                    limit: limit,
                    offset: offset,
                    name: name
                }
            });
            let data = response.data;
            return dispatch({
                type: 'GET_POKEMONS',
                payload: data,
            });
        } catch (error) {
            console.log("Error when making get pokemons request: ", error.message)
        };
    };
};

export const getTypes = () => {
    const endpoint = 'http://localhost:3001/types';
    return async (dispatch) => {
        try {
            const response = await axios.get(endpoint);
            let data = response.data;
            
            return dispatch({
                type: 'GET_TYPES',
                payload: data,
            });
        } catch (error) {
            console.error(error);
        };
    };
};

export const searchPokemon = (name, limit, offset) => {
    const endpoint = 'http://localhost:3001/pokemons/search?name=' + name;
    return async (dispatch) => {
        try {
            const response = await axios.get(endpoint, {
                params: {
                    limit: limit,
                    offset: offset,
                }
            });

            let data = response.data;

            return dispatch({
                type: 'SEARCH_POKEMONS',
                payload: data,
            });
        } catch (error) {
            console.error(error);
        };
    };
};

export const setGlobalFilters = (filters) => {
    return async (dispatch) => {
        return dispatch({
            type: 'SET_FILTERS',
            payload: filters,
        });
    }
};

export const setCurrentPage = (page) => {
    return async (dispatch) => {
        return dispatch({
            type: 'SET_PAGE',
            payload: page,
        });
    };
};

export const detailView = (id) => {
    const endpoint = 'http://localhost:3001/pokemons/' + id;
    return async (dispatch) => {
        try {
            const response = await axios.get(endpoint);
            let data = response.data;

            return dispatch({
                type: 'DETAIL_VIEW',
                payload: data,
            });
        } catch (error) {
            console.error(error);
        };
    };
};

export const deletePokemon = (pokemon) => {
    console.log(pokemon.id);
    const endpoint = 'http://localhost:3001/pokemons/' + pokemon.id;
    return async (dispatch) => {
        try {
            const response = await axios.delete(endpoint);
            let data = response.data;

            return dispatch({
                type: 'DELETE_POKEMON',
                payload: data,
            });
        } catch (error) {
            console.error(error);
        };
    };
};

export const createPokemon = (pokemon) => {
    const endpoint = 'http://localhost:3001/pokemons';
    return async (dispatch) => {
        try {
            const response = await axios.post(endpoint, pokemon);
            let data = response.data;

            return dispatch({
                type: 'CREATE_POKEMON',
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: 'CREATE_POKEMON',
                error: error
            });
        };
    };
};

export const updatePokemon = (id, pokemon) => {
    console.log(id);
    const endpoint = 'http://localhost:3001/pokemons/' + id;
    return async (dispatch) => {
        try {
            const response = await axios.put(endpoint, pokemon);
            let data = response.data;

            return dispatch({
                type: 'UPDATE_POKEMON',
                payload: data,
            });
        } catch (error) {
            console.error(error);
        };
    };
};