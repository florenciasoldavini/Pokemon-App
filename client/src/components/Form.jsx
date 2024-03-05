import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon, getTypes } from '../redux/actions';
import validation from "./validation";

const Form = () => {
    const dispatch = useDispatch();
    const types = useSelector(state => state.types);
    const error = useSelector(state => state.error);

    useEffect(() => {
        dispatch(getTypes())
    }, []);

    const [pokemon, setPokemon] = useState({
        name: '',
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: '',
    });

    const [success, setSuccess] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleChange = (event) => {
        setPokemon({
            ...pokemon,
            [event.target.name]: event.target.value
        });

        setErrors({
            ...errors,
            [event.target.name]: '',
        });

        setSuccess(false);
        setFeedback('');
    };

    const handleMultiSelect = (event) => {
        const formTypes = Array.from(event.target.selectedOptions, option => option.value);

        setPokemon({
            ...pokemon,
            types: formTypes
        });

        setSuccess(false);
        setFeedback('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validation({
            ...pokemon,
            [event.target.name]: event.target.value,
        })

        setErrors(
            validationErrors
        );

        const isValid = !Object.values(validationErrors).some(error => error);


        if (isValid) {
            await dispatch(createPokemon(pokemon));

            console.log(error);

            if (error !== '') {
                setFeedback(error)
            } else {
                setPokemon({
                    name: '',
                    image: '',
                    hp: '',
                    attack: '',
                    defense: '',
                    speed: '',
                    height: '',
                    weight: '',
                    types: '',
                });

                setErrors({
                    ...errors,
                    forename: '',
                    name: '',
                    image: '',
                    hp: '',
                    attack: '',
                    defense: '',
                    speed: '',
                    height: '',
                    weight: '',
                    types: '',
                });

                setSuccess(true);
                setFeedback("¡Pokemon creado con éxito!");
            }
        }
    };

    return (
        <div className='page' id='form-page'>
            <form className='form' onSubmit={handleSubmit}>
                <h1 className='txt'>Crear un Pokemon</h1>
                <label className='form-txt'>Nombre:</label>
                <input className='form-input' name='name' type='text' placeholder='Ingrese un nombre...' onChange={handleChange} value={pokemon.name}></input>
                {errors.name && <p className='error-txt'>{errors.name}</p>}
                <label className='form-txt'>Imagen:</label>
                <input className='form-input' name='image' type='text' placeholder='Inserte un link...' onChange={handleChange} value={pokemon.image}></input>
                {errors.image && <p className='error-txt'>{errors.image}</p>}
                <label className='form-txt'>Vida:</label>
                <input className='form-input' name='hp' type='text' placeholder='Vida' onChange={handleChange} value={pokemon.hp}></input>
                {errors.hp && <p className='error-txt'>{errors.hp}</p>}
                <label className='form-txt'>Ataque:</label>
                <input className='form-input' name='attack' type='text' placeholder='Ataque' onChange={handleChange} value={pokemon.attack}></input>
                {errors.attack && <p className='error-txt'>{errors.attack}</p>}
                <label className='form-txt'>Defensa:</label>
                <input className='form-input' name='defense' type='text' placeholder='Defensa' onChange={handleChange} value={pokemon.defense}></input>
                {errors.defense && <p className='error-txt'>{errors.defense}</p>}
                <label className='form-txt'>Velocidad:</label>
                <input className='form-input' name='speed' type='text' placeholder='Velocidad' onChange={handleChange} value={pokemon.speed}></input>
                {errors.speed && <p className='error-txt'>{errors.speed}</p>}
                <label className='form-txt'>Altura:</label>
                <input className='form-input' name='height' type='text' placeholder='Altura' onChange={handleChange} value={pokemon.height}></input>
                {errors.height && <p className='error-txt'>{errors.height}</p>}
                <label className='form-txt'>Peso:</label>
                <input className='form-input' name='weight' type='text' placeholder='Peso' onChange={handleChange} value={pokemon.weight}></input>
                {errors.weight && <p className='error-txt'>{errors.weight}</p>}
                <label className='form-txt'>Tipo/s:</label>
                <select className='multiselect' name='type' multiple='multiple' onChange={handleMultiSelect} value={pokemon.types}>
                    {
                        types.map((type) => {
                            return <option key={type}>{type}</option>
                        })
                    }
                </select>
                {errors.types && <p className='error-txt'>{errors.types}</p>}
                <p className='feedback-txt'>{feedback}</p>
                <div className='form-btn-container'>
                    <button className='btn' id='crear-btn' type='submit'>Crear Pokemon</button>
                    <Link className='btn' id='atras-btn' to='/home'>Atrás</Link>
                </div>
            </form>
        </div>
    )
};

export default Form;