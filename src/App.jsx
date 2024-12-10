import { useEffect, useState } from "react";
import "./styles/App.css"
import { Outlet } from "react-router-dom";
import NavBar from "./components/Partials/NavBar"


const App = () => {
  const initalToken = localStorage.getItem("token");
  const [token,setToken] = useState(initalToken);
  const [edit,setEdit] = useState(true); 
  const [lists,setLists]=useState(null);
  const [error,setError]=useState(null);
  const [loading,setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState(null)

  useEffect(()=>{
    fetch(import.meta.env.VITE_BACKEND +"/lists",{
        method: "GET",
        mode:"cors",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " +token
        }
      })
      .then((response)=>response.json())
      .then((json)=>{
        setLists(json)
      })
      .catch((error)=>{
        console.log(error)
        setError(error)
      })
},[edit])
useEffect(()=>{
  // get 10 books from db that are not on users lists
  if(lists!=null){
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
  }
},[lists])


if(error) return <p>Error</p>
if(loading) return <p>Loading</p>
  


  else return (
    <>
      <NavBar token={token} setToken={setToken}/>
      <Outlet context={[token,setToken,edit,setEdit,lists,setLists,suggestions,setSuggestions]}/>
    </>
  );
};

export default App;