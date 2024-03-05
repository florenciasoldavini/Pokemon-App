const axios = require('axios');
const { Pokemon, Type } = require('./../db');
const { Op } = require("sequelize");

const URL = "https://pokeapi.co/api/v2/pokemon/";

const postPokemon = async (req, res) => {
    try {
        const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;

        if (name && image && hp && attack && defense && speed && height && weight && types) {

            const response = await axios.get(URL);
            const results = response.data.results;
            const pokemonInAPI = results.filter(pokemon =>
                pokemon.name === name
            );

            if (!pokemonInAPI.length ) {
                const newPokemon = await Pokemon.create({
                    name: name.toLowerCase(),
                    image,
                    hp,
                    attack,
                    defense,
                    speed,
                    height,
                    weight,
                });

                types.forEach(async type => {
                    const typeInDB = await Type.findAll({
                        where: {
                            name: {
                                [Op.like]: type,
                            }
                        }
                    });

                    await newPokemon.addType(typeInDB, { through: 'pokemon_type' });
                });

                res.status(204).send("¡Pokemon creado con éxito!");
            } 
        } else {
            res.status(422).send({ error: "Faltan datos" });
        };
    } catch (error) {
        res.status(500).send({ error: "Ya existe un pokemon con ese nombre" })
    };
};

module.exports = postPokemon;