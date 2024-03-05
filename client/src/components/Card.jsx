import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePokemon, getPokemons } from '../redux/actions';

const REGEX_UUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

const Card = ({ id, name, image, attack, types }) => {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters);

    const handleClose = () => {
        dispatch(deletePokemon({ id }));
        dispatch(getPokemons(filters, 20, 0));
    };

    let isUUID = String(id).match(REGEX_UUID) ? true : false;

    const renderButton = () => {
        if (isUUID) {
            return <div>
                <button className='btn' id='eliminar-btn' onClick={handleClose}>Eliminar</button>
            </div>
        }
    };

    return (
        <div id="card">
            

            <Link to={`/detail/${id}`}>
                <h2 className='card-txt'>{name} {renderButton()}</h2>
            </Link>
            <img src={image} alt='' id='card-img' />
            <p className='card-txt'>Ataque: {attack}</p>
            <p className='card-txt'>Tipos: {types.join(", ")}</p>
        </div>
    )
};

export default Card;