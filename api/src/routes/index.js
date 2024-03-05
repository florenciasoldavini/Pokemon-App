const { Router } = require("express");
const getPokemons = require('../controllers/getPokemons');
const getPokemonById = require('../controllers/getPokemonById')
const getPokemonByName = require('../controllers/getPokemonByName');
const getTypes = require('../controllers/getTypes');
const postPokemon = require('../controllers/postPokemon');
const deletePokemon = require('../controllers/deletePokemon');
const updatePokemon = require('../controllers/updatePokemon');

function registerRouter() {
    const router = Router();

    router.get('/pokemons', (req, res) => {
        getPokemons(req, res)
    });
    
    router.get('/pokemons/search', (req, res) => {
        getPokemonByName(req, res)
    });
    
    router.get('/pokemons/:idPokemon', (req, res) => {
        getPokemonById(req, res)
    });
    
    router.post('/pokemons', (req, res) => {
        postPokemon(req, res)
    });
    
    router.get('/types', (req, res) => {
        getTypes(req, res)
    });
    
    router.delete('/pokemons/:idPokemon', (req, res) => {
        deletePokemon(req, res)
    });
    
    router.put('/pokemons/:idPokemon', (req, res) => {
        updatePokemon(req, res)
    });

    return router;
}

module.exports = registerRouter();
