const { Pokemon, Type } = require('./../db');
const { Op } = require("sequelize");


const updatePokemon = async (req, res) => {
    try {
        const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;
        const id = req.params.idPokemon;

        console.log("en el update");
        console.log(id);

        if (id && name && image && hp && attack && defense && speed && height && weight && types) {

            const pokemonFound = await Pokemon.findByPk(id, {
                include: Type
            });

            if (pokemonFound) {

                const typesFound = [];
                pokemonFound.types.forEach(type => typesFound.push(type.name))

                typesFound.forEach(async (type) => {
                    if (!types.includes(type)) {
                        const typeInDB = await Type.findAll({
                            where: {
                                name: {
                                    [Op.like]: type,
                                }
                            }
                        });
                        await pokemonFound.removeType(typeInDB, { through: 'pokemon_type' });
                    };
                });

                types.forEach(async (type) => {
                    if (!typesFound.includes(type)) {
                        const typeInDB = await Type.findAll({
                            where: {
                                name: {
                                    [Op.like]: type,
                                }
                            }
                        });
                        await pokemonFound.addType(typeInDB, { through: 'pokemon_type' });
                    };
                });

                await Pokemon.update({
                    name,
                    image,
                    hp,
                    attack,
                    defense,
                    speed,
                    height,
                    weight,
                }, {
                    where: {
                        id: id
                    }
                });

                res.status(204).send();
            } else {
                res.status(404).send({ error: "Pokemon no encontrado" });
            };
        } else {
            res.status(422).send({ error: "Faltan datos" });
        };
    } catch (error) {
        res.status(500).send({ error: error.message });
    };
};

module.exports = updatePokemon;