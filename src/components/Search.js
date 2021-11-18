import * as BooksAPI from '../BooksAPI';
import Book from './Book';
import propTypes from 'prop-types';
import { useState } from 'react';
import {Link} from 'react-router-dom';

const Search = (props) => {
    const {books, updateBooks} = props;
    const [search, setSearch] = useState([]);
    const [searching, setSearching] = useState('');

    const updateSearch = (searching) =>{
        if(searching){
            BooksAPI.search(searching)
                .then((result)=>{
                    //result.error ? setSearch([]) : setSearch(result)
                    if(result.error){setSearch([])
                    }else{setSearch(result)}
                })
        }else{
            setSearch([])
        }
    }

    const updateSearchQuery = (searching) => {
        setSearching(searching);
        updateSearch(searching);
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className = "close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    <input 
                        type="text"
                        placeholder="Search by title or author"
                        value = {searching}
                        onChange = {(c) => updateSearchQuery(c.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {search.map(result =>{
                        let shelf = 'none';

                        books.map(book=>(
                            book.id === result.id ? shelf = book.shelf : ''
                        ));
                        return(
                            <li key={result.id}>
                                <Book
                                    book={result}
                                    updateBooks={updateBooks}
                                    shelf={shelf}
                                />
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
}

// Search.propTypes={
//     books:propTypes.array.isRequired,
//     updateBooks:propTypes.func.isRequired
// }

export default Search;