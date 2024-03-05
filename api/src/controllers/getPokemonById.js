const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { allPokemonsFromAPI } = require('../startup/pokemons');

const REGEX_UUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

const getPokemonById = async (req, res) => {
    const id = req.params.idPokemon;

    let isUUID = id.match(REGEX_UUID) ? true : false;

    if (id) {
        try {
            if (isUUID) {
                const pokemon = await Pokemon.findByPk(id, {
                    include: Type
                });

                const types = [];
                pokemon.types.forEach(type => types.push(type.name))

                pokemonInDB = {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.image,
                    hp: pokemon.hp,
                    attack: pokemon.attack,
                    defense: pokemon.defense,
                    speed: pokemon.speed,
                    height: pokemon.height,
                    weight: pokemon.weight,
                    types: types,
                };


                res.json(pokemonInDB);
            } else {
                const pokemonInAPI = allPokemonsFromAPI.filter(pokemon => pokemon.id == id)[0]

                console.log(pokemonInAPI);

                res.json(pokemonInAPI);
            };
        } catch (error) {
            res.status(500).send({ error: error.message });
        };
    } else {
        res.status(422).send({ error: "Faltan datos" });
    };
};

module.exports = getPokemonById;