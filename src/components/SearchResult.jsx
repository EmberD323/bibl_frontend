import { useLocation } from "react-router-dom";
import SearchBook from "./Partials/SearchBook";

export default function SearchResult (){
    //get searchResult from navigation state
    const { state } = useLocation();
    const { thisSearchResult } = state;
    console.log(thisSearchResult)
    //if no search results
    if(thisSearchResult.totalItems == 0){
       return(
         <div className="searchResults">
            <h2>Search Results</h2>
            <div>No results found</div>
            
        </div>
        )
    }
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


