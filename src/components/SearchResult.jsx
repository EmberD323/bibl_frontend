import { useOutletContext,useLocation } from "react-router-dom";
import { useEffect, useState, } from "react";
import Authors from "./Partials/Authors";


export default function SearchResult (){
    const { state } = useLocation();
    const { thisSearchResult } = state;
    //clean up - make sure they all have  images
    let filteredBooks = [];
    thisSearchResult.items.map((book) =>{
        if(book.volumeInfo.imageLinks != undefined && book.volumeInfo.authors != undefined){
            if(book.volumeInfo.authors.length>1){
                
            }
            filteredBooks.push(book)
        }
    });
    function handleBookOpen(e){

    }
 
    return (
        <div className="searchResults">
            <h2>Search Results</h2>
            <div>Results: {filteredBooks.length}</div>
            <ul>
                {filteredBooks.map((book) => {
                    return(
                        <li key={book.id} >
                            {/* onClick={handleBookOpen} style={{cursor:"grab"}} */}
                            <img src={book.volumeInfo.imageLinks.thumbnail} alt="book_cover" onClick={handleBookOpen} style={{cursor:"grab"}}/>
                            <div className="title" onClick={handleBookOpen} style={{cursor:"grab"}}>{book.volumeInfo.title}</div>
                            <Authors authors={book.volumeInfo.authors}/>
                        </li>
                    )
                })}
            </ul>

            
        </div>
        

    )
}


