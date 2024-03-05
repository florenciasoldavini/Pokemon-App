const axios = require('axios');
const https = require('https');

const URL = "https://pokeapi.co/api/v2/pokemon/?limit=1292";

const allPokemonsFromAPI = [];

const importantStats = ['hp', 'attack', 'defense', 'speed']

const filterStats = (array) => {
    const res = {};

    for (const element of array) {
        if (importantStats.includes(element.stat.name)) {
            res[element.stat.name] = element.base_stat
        }
    };

    return res
};

const setPokemonsFromAPI = async () => {
    try {
        const response = await axios.get(URL);

        const results = response.data.results;

        const axiosInstance = axios.create({baseURL: 'https://pokeapi.co/api/v2/pokemon', httpsAgent: new https.Agent({ keepAlive: true })})

        for (element of results) {
            const response = await axiosInstance.get('/'+element.name);

            const data = response.data;

            const {hp, attack, defense, speed} = filterStats(data.stats);
        
            const types = data.types.map(obj => obj.type.name);

            const pokemon = {
                id: data.id,
                name: data.name,
                image: data.sprites.other.dream_world.front_default ? data.sprites.other.dream_world.front_default : data.sprites.front_default,
                hp,
                attack,
                defense,
                speed,
                height: data.height,
                weight: data.weight,
                types: types,
            };

            allPokemonsFromAPI.push(pokemon);
        };
    } catch (error) {
        console.log(error);
    };
};

module.exports = {
    allPokemonsFromAPI,
    setPokemonsFromAPI,
}; 