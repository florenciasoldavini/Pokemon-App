const regexName = /^[a-zA-Z\p{L}' ]+$/u
const regexURL = /^(https?:\/\/)?[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)+(\/[a-zA-Z0-9\-_\?\,\.\/\%\=]*)?$/;
const isNumeric = (value) => {
    return /^-?\d+$/.test(value);
};

export default function validation(pokemon) {
    const errors = {}

    if (regexName.test(pokemon.name)) {
        errors.name = '';
    } else {
        errors.name = 'El nombre no puede contener números ni símbolos'
    }; 

    if (regexURL.test(pokemon.image)) {
        errors.image = '';
    } else {
        errors.image = 'No es una URL válida';
    };

    if (isNumeric(pokemon.hp)) {
        errors.hp = '';
    } else {
        errors.hp = 'La vida debe ser un valor numérico'
    };

    if (isNumeric(pokemon.attack)) {
        errors.attack = '';
    } else {
        errors.attack = 'El ataque debe ser un valor numérico'
    };

    if (isNumeric(pokemon.defense)) {
        errors.defense = '';
    } else {
        errors.defense = 'La defensa debe ser un valor numérico'
    };

    if (isNumeric(pokemon.speed)) {
        errors.speed = '';
    } else {
        errors.speed = 'La velocidad debe ser un valor numérico'
    };

    if (isNumeric(pokemon.height)) {
        errors.height = '';
    } else {
        errors.height = 'La altura debe ser un valor numérico'
    };

    if (isNumeric(pokemon.weight)) {
        errors.weight = '';
    } else {
        errors.weight = 'El peso debe ser un valor numérico'
    };

    if (pokemon.types.length !== 0) {
        errors.types = '';
    } else {
        errors.types = 'Debe seleccionar al menos un tipo'
    };

    return errors;
}