const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { allPokemonsFromAPI } = require('../startup/pokemons');
const { Op } = require("sequelize");

const URL = "https://pokeapi.co/api/v2/pokemon/";
const DEFAULT_LIMIT = 12
const DEFAULT_OFFSET = 0

const getPokemonByName = async (req, res) => {
    try {
        let { name, offset, limit } = req.query;

        limit = limit ? Number(limit) : DEFAULT_LIMIT;
        offset = offset ? Number(offset) : DEFAULT_OFFSET;

        const pokemons = await Pokemon.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                }
            },
            include: Type
        });

        const pokemonsInDB = pokemons.map(pokemon => {
            const types = [];
            pokemon.types.forEach(type => types.push(type.name))

            return {
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
        });
        
        const pokemonsInAPI = allPokemonsFromAPI.filter(pokemon => pokemon.name.includes(name.toLowerCase()));

        const pokemonsFound = pokemonsInAPI.concat(pokemonsInDB)

        const paginatedResponse = pokemonsFound.slice(offset, limit + offset);
        const numberOfPages = Math.floor(pokemonsFound.length / limit)

        res.send({paginatedResponse, numberOfPages});

    } catch (error) {
        res.status(500).send({ error: error.message });
    };
};

module.exports = getPokemonByName;