import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useGetBookByIdQuery} from "../../api/booksApi";
import {useSelector} from "react-redux";

const Book = () => {
    const id = useParams().id
    const {data, isLoading, error} = useGetBookByIdQuery(id)
    const isSubmitted = useSelector(state => state.filter.isSubmitted)
    const navigate = useNavigate()

    useEffect(() => {
        if (isSubmitted) {
            navigate('/')
        }
    }, [isSubmitted])


    if (isLoading) {
        return <span>Loading...</span>
    }

    if (error) {
        return (
            <div>
                {error.status} {JSON.stringify(error.data)}
            </div>
        )
    }

    return (
        <div className='book'>
            <div className='book__left'>
                {data.volumeInfo.imageLinks &&
                <img className='book__img' src={data.volumeInfo.imageLinks.medium} alt={data.volumeInfo.title}/>}
            </div>
            <div>
                <h2> {data.volumeInfo.title}</h2>
                {data.volumeInfo.categories && data.volumeInfo.categories.map(el =>
                    <span className='book__category'>{el}</span>)}
                {data.volumeInfo.authors && data.volumeInfo.authors.map(el =>
                    <h4 key={el} className='book__authors'>{el}</h4>)}
                <p>{data.volumeInfo.description}</p>
            </div>
        </div>
    );
};

export default Book;