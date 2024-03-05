import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="page" id="landing-page">
            <div className='btn-container'>
                <button className='btn' id='ver-pokemones-btn'>
                    <Link className='txt' id='ver-pokemones-txt' to='/home' >Ver pokemones</Link>
                </button>
            </div>
        </div>
    )
};

export default Landing;