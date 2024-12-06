import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { func } from "prop-types";
import Book from "./Book";



export default function CurrentList ({selectedList}){
        // const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();

    if(selectedList == null) return;
    //if theres no books on the list
    if(selectedList.books == "") return(
        <div className="currentList">
            <h2>Current List</h2>
            <div>No books on the list yet, add some!</div>
        </div>
    );
  
    
    return (
        <div className="currentList">
            <h2>Current List</h2>
            <ul>
                {selectedList.books.map((book) => {
                    console.log(book)
                    return(
                        <li key={book.book.id} >
                            
                            <Book book={book}/>
                            
                        </li>
                    )
                })}
            </ul>

            
        </div>
        

    )
}


