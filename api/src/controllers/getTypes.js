const { allPokemonTypes } = require('../startup/types')

const getTypes = async (req, res) => {

    // try {
    //     const response = await axios.get(URL);
    //     const results = response.data.results;
        
    //     const pokemonTyes = [];

    //     for (const pokemon of results) {
    //         const response = await axios.get(pokemon.url);
    //         const types = response.data.types;

    //         for (const element of types) {
    //             if (!pokemonTyes.includes(element.type.name)) {
    //                 pokemonTyes.push(element.type.name)
    //             };
    //         };
    //     };

    //     pokemonTyes.forEach(async type => {
    //         await Type.create({
    //             name: type,
    //         });
    //     });

    //     res.send(pokemonTyes);
    // } catch (error) {
    //     res.status(500).send({ error: error.message });
    // };

    res.status(200).send(allPokemonTypes)
};

module.exports = getTypes;