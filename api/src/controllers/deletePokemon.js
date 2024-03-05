const { Pokemon } = require('./../db');

const deletePokemon = async (req, res) => {
    try {
        const id = req.params.idPokemon;

        console.log(id);
        

        if (id) {
            await Pokemon.destroy({
                where: { id: id }
            });
            res.json(204);
        } else {
            res.status(422).send({ error: "Faltan datos" });
        };
    } catch (error) {
        res.status(500).send({ error: error.message });
    };
};

module.exports = deletePokemon;