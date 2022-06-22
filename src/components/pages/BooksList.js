import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useGetBooksQuery} from "../../api/booksApi";
import {useNavigate} from "react-router-dom";
import {resetForm} from "../../redux/slices/filterSlice";


const BooksList = () => {
    const filter = useSelector(state => state.filter)
    const [page, setPage] = useState(0)
    const [books, setBooks] = useState([])
    const {data, isLoading, isFetching, error} = useGetBooksQuery([filter.name, filter.orderBy, page])
    const dispatch = useDispatch()

    useEffect(() => {
        setBooks([])
        setPage(0)
    }, [filter.name, filter.category, filter.orderBy])


    useEffect(() => {

        if (data && data.items) {
            dispatch(resetForm())
            if (filter.category !== 'all') {
                setBooks(prevState => {
                    return [
                        ...prevState, ...data.items.filter(el => {
                            if (el.volumeInfo.categories) {
                                if (el.volumeInfo.categories[0].toLowerCase() === filter.category) {
                                    return el
                                }
                            }
                        })
                    ]
                })
            } else {

                setBooks(prevState => {
                    return [
                        ...prevState, ...data.items
                    ]
                })
            }

        }

    }, [data, filter.category])

    if (!page && (isLoading || isFetching)) {
        return <span>Loading...</span>
    }

    const loadMore = () => {
        if (filter.name) {
            setPage(page + 1)
        }
    }

    if (error) {
        return (
            <div>
                {error.status} {JSON.stringify(error.data)}
            </div>
        )
    }


    return (
        <div>
            {filter.category === 'all' && <span
                className='books__total'> {data.totalItems ? 'Found ' + data.totalItems : 'No matches were found'}
            </span>}
            <ul className='books__list'>
                {books.map(el => <Book
                    key={el.id}
                    id={el.id}
                    title={el.volumeInfo.title}
                    category={el.volumeInfo.categories}
                    authors={el.volumeInfo.authors}
                    img={el.volumeInfo.imageLinks}
                />)}
            </ul>
            {data.totalItems > 30 &&
            <button className='books__btn' onClick={loadMore}
                    disabled={isFetching}>{isFetching ? 'Loading...' : 'Load More'}</button>}
        </div>
    );
};


const Book = ({id, title, img, category, authors}) => {
    const navigate = useNavigate()
    const onClick = () => {
        navigate(id)
    }

    return (
        <li className='book-card' onClick={onClick}>
            <div className='book-card__top'>
                {img ?
                    <img className='book-card__img' src={img.thumbnail} alt={title}/> :
                    <span className='plug'/>}
            </div>
            {category && <span className='book-card__category'>{category[0]}</span>}
            <h3 className='book-card__title'>{title}</h3>
            {authors && authors.map(el => <h4 key={el} className='book-card__authors'>{el}</h4>)}
        </li>
    )
}


export default BooksList;



