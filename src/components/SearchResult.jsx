import { useLocation } from "react-router-dom";
import SearchBook from "./Partials/SearchBook";

export default function SearchResult (){
    window.scrollTo(0, 0);

    //get searchResult from navigation state
    const { state } = useLocation();
    const { thisSearchResult } = state;

    //filter results to make sure they have authors and images
    let filteredBooks = [];
    thisSearchResult.items.map((book) =>{
        if(book.volumeInfo.imageLinks != undefined && book.volumeInfo.authors != undefined){
            filteredBooks.push(book)
        }
    });

    return (
        <div className="searchResults">
            <h2>Search Results</h2>
            <div>Results: {filteredBooks.length}</div>
            <ul>
                {filteredBooks.map((book) => {
                    return(
                        <li key={book.id} >
                            <SearchBook book={book}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}


