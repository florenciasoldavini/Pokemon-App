
const axios = require('axios');
const URL = "https://pokeapi.co/api/v2/pokemon/";
const { Type } = require('./../db');

const allPokemonTypes = [];

const setPokemonTypes = async () => {
    try {
        const response = await axios.get(URL);
        const results = response.data.results;

        const pokemonTypes = [];

        for (const pokemon of results) {
            const response = await axios.get(pokemon.url);
            const types = response.data.types;

            for (const element of types) {
                if (!pokemonTypes.includes(element.type.name)) {
                    pokemonTypes.push(element.type.name);
                };
            };
        };

        pokemonTypes.forEach(async type => {
            await Type.create({
                name: type,
            });
        });

        pokemonTypes.forEach(type => allPokemonTypes.push(type));
    } catch (error) {
        console.log(error);
    };
};

module.exports = {
    setPokemonTypes,
    allPokemonTypes,
}; 