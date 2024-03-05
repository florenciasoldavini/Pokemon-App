const initialState = {
    pokemons: [],
    types: [],
    pokemonDetail: [],
    filters: {},
    error: "",
    numberOfPages: 1,
    currentPage: 1,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                numberOfPages: action.payload.numberOfPages,
                pokemons: action.payload.paginatedResponse,
            };

        case 'SEARCH_POKEMONS':
            return {
                ...state,
                pokemons: action.payload.paginatedResponse,
                numberOfPages: action.payload.numberOfPages,
            };

        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            };

        case 'DETAIL_VIEW':
            return {
                ...state,
                pokemonDetail: action.payload
            };

        case 'CREATE_POKEMON':
            if (action.error) {
                return {
                    ...state,
                    error: action.error.response.data.error
                }
            }
            else {
                return {
                    ...state,
                    error: ''
                }
            }
        case 'SET_FILTERS':
            return {
                ...state,
                filters: action.payload,
            }

        case 'SET_PAGE':
            return {
                ...state,
                currentPage: action.payload,
            }

        default:
            return { ...state };
    }
};

export default rootReducer;