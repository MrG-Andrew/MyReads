import propTypes from 'prop-types';
import Book from './Book';
import { Link } from 'react-router-dom';

const Home = (props) => {
    const {books, updateBooks} = props; 

    const shelves = [
        {key: "currentlyReading", title : 'Currently Reading'},
        {key: "wantToRead", title : 'Want to Read'},
        {key: "read", title : 'Read'}
    ];

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {shelves.map((currentShelf)=> {
                    const shelfKey = currentShelf.key;
                    const shelfTitle = currentShelf.title;
                    return(
                        <div className="bookshelf" key = {shelfKey}>
                            <h2 className="bookshelf-title">{shelfTitle}</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {books.filter(book=>book.shelf === shelfKey)
                                            .map(book=>(
                                                <li key ={book.id}>
                                                    <Book
                                                        book = {book}
                                                        updateBooks = {updateBooks}
                                                        shelf = {shelfKey}
                                                    />
                                                </li>
                                            ))
                                    }
                                </ol>
                            </div>
                        </div>
                    );
                })}
                
            </div>

            <div className="open-search">
                <Link to='/search'>Add a book</Link>    
            </div>     
        </div>
    );
}
 
// Home.propTypes = {
//     books: propTypes.array.isRequired,
//     updateBooks: propTypes.func.isRequired
// }

export default Home;