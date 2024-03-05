import { useEffect } from "react";
import { getPokemons, setCurrentPage } from "../redux/actions";
import { useDispatch, useSelector } from 'react-redux';

function generateOptions(n) {
    const options = [];
    for (let i = 1; i <= n; i++) {
        let opt = <option key={i} value={i}>{i}</option>
        options.push(opt);
    }
    return options;
};

const Pagination = () => {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters);
    const totalPages = useSelector(state => state.numberOfPages);
    const currentPage = useSelector(state => state.currentPage);

    console.log(currentPage);

    useEffect(() => {
        dispatch(getPokemons(filters, 12, currentPage * 12 - 12));
    }, [currentPage]); 

    const options = generateOptions(totalPages);

    const handlePrev = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1))
        };
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            dispatch(setCurrentPage(currentPage + 1))
        };
    };

    const handlePageChange = (event) => {
        dispatch(setCurrentPage(parseInt(event.target.value)))
    };

    return (
        <div className='pagination'>
            <button className='pagination-btn' onClick={handlePrev}>Prev</button>
            <select className='pagination-dropdown' onChange={handlePageChange} value={currentPage}>
                {options}
            </select>
            <p className='pagination-txt'> {`de ${totalPages}`}</p>
            <button className='pagination-btn' onClick={handleNext}>Next</button>
        </div>
    )
};

export default Pagination;