import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

import Suggestions from "./Partials/Suggestions"
import CurrentlyReading from "./Partials/CurrentlyReading"
import Feed from "./Partials/Feed"


export default function HomePage (){
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    if(lists ==null)return
    const [suggestions, setSuggestions] = useState(null)
    const [error,setError]=useState(null);
    const [loading,setLoading] = useState(true);

    // console.log(suggestionData)
    useEffect(()=>{
        // get 10 books from db that are not on users lists
        fetch(import.meta.env.VITE_BACKEND +"/lists/books",{
                method: "GET",
                mode:"cors",
                headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " +token
                }
            })
            .then((response)=>response.json())
            .then((json)=>{
                let allBooks = json;
                let booksNotOnUsersLists =[];
                const test = allBooks.map((book)=>{//find all books not on users lists
                    if(book.lists[0]==undefined){
                        booksNotOnUsersLists.push(book);
                    }
                    else{
                        const allUserBooks=[];
                        lists.map((list) =>{
                            list.books.map((book)=>allUserBooks.push(book))
                        });
                        //if none of user lists are in list
                        let found = allUserBooks.find((findbook)=>findbook.bookId == book.id);
                        // //create a list for another user and add a book that i dont have on a list there
                        if(found == undefined ){
                            found = true;
                            booksNotOnUsersLists.push(book);
                        }
                    }
                })
                const first8Books = booksNotOnUsersLists.slice(-9,-1)
                setSuggestions(first8Books)
                //add first 8 to suggestions
                
            })
            .catch((error)=>{
                console.log(error)
                setError(error)
                })
            .finally(setLoading(false));
    },[edit])
    if(error) return <p>Error</p>
    if(loading) return <p>Loading</p>

    //if not logged in
    if(typeof token == "object"){
        return (
          <div className="notLoggedIn">
            <div>Welcome to Bibl.</div>
            <div><Link to="login">Log in</Link> or <Link to="signup">Sign Up</Link>!</div>
            <div className="dummy">
              <div>Or, use these dummy account credentials to try out the app:</div>
              <div>Email -  jane.doe@gmail.com</div>
              <div>Password - janespassword1</div>
            </div>
           </div>
          )
    }
    return (
        <div className="homepage">
            <h2>Homepage</h2>
            <div className="content">
              <CurrentlyReading/>
              <Suggestions suggestions={suggestions}/> 
              <Feed/>
            </div>
        </div>    
    )
}


