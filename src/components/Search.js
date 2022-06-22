import React, {useState} from 'react';
import {Outlet} from "react-router";
import {useDispatch} from "react-redux";
import {setFilter} from '../redux/slices/filterSlice'

const Search = () => {
    const [filterValues, setFilterValues] = useState({
        name: 'js',
        category: 'all',
        orderBy: 'relevance'
    })
    const dispatch = useDispatch()

    const onChange = e => {

        setFilterValues(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        if (filterValues.name) {
            dispatch(setFilter(filterValues))
        }
    }

    return (
        <div className='container'>
            <form className='filter' onSubmit={onSubmit}>
                <div className='filter__top'>
                    <div className='filter__search'>
                        <input className='filter__input' name='name' type="text" value={filterValues.name}
                               onChange={onChange}/>
                        <button className='filter__button' type='submit'/>
                    </div>
                </div>

                <div className='filter__selects'>
                    <div>
                        <h3 className='filter__name'>Categories</h3>
                        <select name='category' value={filterValues.category} onChange={onChange}>
                            <option value="all">all</option>
                            <option value="art">art</option>
                            <option value="biography">biography</option>
                            <option value="history">history</option>
                            <option value="computers">computers</option>
                            <option value="medical">medical</option>
                            <option value="poetry">poetry</option>
                        </select>
                    </div>
                    <div>
                        <h3 className='filter__name'>Sorting by</h3>
                        <select name='orderBy' value={filterValues.order} onChange={onChange}>
                            <option value="relevance">relevance</option>
                            <option value="newest">newest</option>
                        </select>
                    </div>
                </div>
            </form>
            <Outlet/>
        </div>
    );
};

export default Search;