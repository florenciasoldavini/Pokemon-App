import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, updatePokemon } from '../redux/actions';
import { useParams } from 'react-router-dom';
import validation from "./validation";

const UpdateForm = () => {
    const dispatch = useDispatch();
    const types = useSelector(state => state.types);
    const error = useSelector(state => state.error);
    const oldPokemon = useSelector(state => state.pokemonDetail);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getTypes())

        setPokemon({
            ...pokemon,
            name: oldPokemon.name,
            image: oldPokemon.image,
            hp: oldPokemon.hp,
            attack: oldPokemon.attack,
            defense: oldPokemon.defense,
            speed: oldPokemon.speed,
            height: oldPokemon.height,
            weight: oldPokemon.weight,
            types: oldPokemon.types,
        });

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
            await dispatch(updatePokemon(id, pokemon));

            console.log(error);

            if (error !== '') {
                setFeedback(error)
            } else {

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
                setFeedback("¡Pokemon actualizado con éxito!");
            }
        }
    };

    return (
        <div className='page' id='form-page'>
            <form className='form' onSubmit={handleSubmit}>
                <h1 className='txt'>Editar Pokemon</h1>
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
                <p className='txt'>{feedback}</p>
                <div className='form-btn-container'>
                    <button className='btn' id='crear-btn' type='submit'>Actualizar</button>
                    <Link className='btn' id='atras-btn' to={`/detail/${id}`}>Atrás</Link>
                </div>
            </form>
        </div>
    )
};

export default UpdateForm;