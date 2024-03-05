const axios = require('axios');
const { Pokemon, Type } = require('./../db');
const { allPokemonsFromAPI } = require('../startup/pokemons');
const { off } = require('../app');


const DEFAULT_LIMIT = 12
const DEFAULT_OFFSET = 0

const getPokemons = async (req, res) => {

    try {
        let { origin, type, sort_by, order_by, limit, offset, name } = req.query;

        limit = limit ? Number(limit) : DEFAULT_LIMIT;
        offset = offset ? Number(offset) : DEFAULT_OFFSET;
        
        name = name ? name : null

        let pokemonsInDB = [];
        let allPokemons = null;

        if (origin === "API") {
            allPokemons = allPokemonsFromAPI;
        };

        if (origin === "DB" || origin === "") {
            pokemonsInDB = await Pokemon.findAll({
                include: Type
            });

            pokemonsInDB = pokemonsInDB.map((pokemon) => {
                const types = [];
                pokemon.types.forEach(type => types.push(type.name));

                return {
                    id: pokemon.id,
                    name: pokemon.name.toLowerCase(),
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

            if (origin === "DB") {
                allPokemons = pokemonsInDB;
            } else {
                allPokemons = allPokemonsFromAPI.concat(pokemonsInDB);
            };
        };

        if (type !== "") {
            allPokemons = allPokemons.filter((pokemon) => {
                return pokemon.types.includes(type)
            });
        };

        if (name != null) {
            allPokemons = allPokemons.filter( pokemon => pokemon.name.includes(name) )
        }

        if (sort_by === "name" || sort_by === "") {
            if (order_by === "asc" || order_by === "") {
                allPokemons.sort((a, b) => {
                    if (b.name < a.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                });
            } else {
                allPokemons.sort((a, b) => {
                    if (a.name < b.name) {
                        return 1;
                    }
                    if (a.name > b.name) {
                        return -1;
                    }
                    return 0;
                });
            };
        };

        if (sort_by === "attack") {
            if (order_by === "asc") {
                allPokemons = allPokemons.sort((a, b) => {
                    if (b.attack < a.attack) {
                        return 1;
                    }
                    if (b.attack > a.attack) {
                        return -1;
                    }
                    return 0;
                });
            } else {
                allPokemons = allPokemons.sort((a, b) => {
                    if (a.attack < b.attack) {
                        return 1;
                    }
                    if (a.attack > b.attack) {
                        return -1;
                    }
                    return 0;
                });
            };
        };

        const paginatedResponse = allPokemons.slice(offset, limit + offset);
        let numberOfPages = Math.ceil(allPokemons.length / limit);

        if (numberOfPages <= 0) {
            numberOfPages = 1
        }

        res.send({paginatedResponse, numberOfPages});
    } catch (error) {
        res.status(500).send({ error: error.message });
    };
};

module.exports = getPokemons;