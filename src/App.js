import './App.css';
import * as BooksAPI from './BooksAPI';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Home from './components/Home'
import Search from './components/Search';
import { useEffect, useState } from 'react';


function BooksApp() {
  const [books, setBooks] = useState([]);

  useEffect(()=>{
    BooksAPI.getAll()
      .then((allBooks)=> {
        setBooks(allBooks)
      })
  });

  const updateBooks = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(()=>{
        BooksAPI.getAll()
          .then((updatedShelf)=>{
            setBooks(updatedShelf)
          })
      })
  };

  return (
    
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={
            <Home
              books = {books}
              updateBooks = {updateBooks}
            />
          }/>
        </Routes>
        <Routes>
          <Route path = "/search" element={
            <Search
              books = {books}
              updateBooks = {updateBooks}
            />
          }/>  
        </Routes>
      </Router>
    </div>
  );
}

export default BooksApp;
