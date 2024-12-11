import { useLocation } from "react-router-dom";
import SearchBook from "./Partials/Search/SearchBook";
import SearchParams from "./Partials/Search/SearchParams";
export default function SearchResult (){
    //get searchResult from navigation state
    const { state } = useLocation();
    const thisSearchResult = state.thisSearchResult;

    //search info
    const query = state.query;
    const searchISBN = state.isbn;
    const searchAuthor = state.author;
    const searchTitle = state.title;
    let searchParams =[searchTitle, searchAuthor,searchISBN];


    //if no search results
    if(thisSearchResult.totalItems == 0){
        if(!state.query)return(
            <div className="searchResults">
                <h2>Search Results</h2>
                <SearchParams searchParams={searchParams}/>
                <div>No results found</div>
            
            </div> 
        )

       return(
         <div className="searchResults">
            <h2>Search Results</h2>
            <div>Query: {query}</div>
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

    if(!state.query)
        return (
        <div className="searchResults">
            <h2>Search Results</h2>
            <SearchParams searchParams={searchParams}/>
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
    return (
        <div className="searchResults">
            <h2>Search Results</h2>
            <div>Query: {query}</div>

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


