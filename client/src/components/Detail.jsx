import { detailView } from "../redux/actions";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const REGEX_UUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const pokemon = useSelector(state => state.pokemonDetail);

    useEffect(() => {
        const fetchPokemon = async () => {
            dispatch(detailView(id));
        };
        fetchPokemon();
    }, [id])

    let isUUID = String(id).match(REGEX_UUID) ? true : false;


    const renderButton = () => {
        if (isUUID) {
            return <div>
                <button id='editar-btn'>
                    <Link id='editar-txt' to={`/update/${id}`}>Editar</Link>
                </button>
            </div>

        }
    };

    return (
        <div className='page' id='detail-page'>
            <div className='detail-container'>
                <button className='btn' id='close-btn'>
                    <Link className='txt' id='close-txt' to='/home'>X</Link>
                </button>
                {renderButton()}
                <h2> {pokemon.name}</h2>
                <div className='img-container'>
                    <img className='detail-img' src={pokemon.image} alt='' />
                </div>
                <h6 >VIDA</h6>
                <h4 >{pokemon.hp}</h4>
                <h6 >ATAQUE</h6>
                <h4 >{pokemon.attack}</h4>
                <h6 >DEFENSA</h6>
                <h4 >{pokemon.defense}</h4>
                <h6 >VELOCIDAD</h6>
                <h4 >{pokemon.speed}</h4>
                <h6 >ALTURA</h6>
                <h4 >{pokemon.height}</h4>
                <h6 >PESO</h6>
                <h4 >{pokemon.weight}</h4>
                <h6 >TIPOS</h6>
                <h4 >{pokemon.types ? pokemon.types.join(", ") : ""}</h4>
            </div>
        </div>
    )
};

export default Detail;