import { useEffect, useState } from "react";
import "./styles/App.css"
import { Outlet,useNavigate } from "react-router-dom";
import NavBar from "./components/Partials/NavBar"
import Loading from "./components/Loading";

const App = () => {
  const initalToken = localStorage.getItem("token");
  const [token,setToken] = useState(initalToken);
  const [edit,setEdit] = useState(true); 
  const [lists,setLists]=useState(null);
  const [error,setError]=useState(null);
  const [loading,setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState(null)
  const navigate = useNavigate()


  //fetch lists
  useEffect(()=>{
    let response;
    if(token != null){
      fetch(import.meta.env.VITE_BACKEND +"/lists",{
        method: "GET",
        mode:"cors",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " +token
        }
      })
      .then((response)=>{
        if(response.status == 403){
          localStorage.removeItem("token");
          setToken(null);
          navigate('../login');
        }
        if(response.ok){
          return response.json();
        }
      })
      .then((json)=>setLists(json))
      .catch((error)=>{
        console.log(response)
        if(response.status == 403){
          localStorage.removeItem("token");
          setToken(null);
          navigate('../login');
        }
        console.log(error)
        setError(error)
      })
    }
    else{
      setLists(null)
      setSuggestions(null)
    }
  },[edit,token])
  //fetch suggestions
  useEffect(()=>{
    if(lists!=null && token!=null){
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
              allBooks.map((book)=>{//find all books not on users lists
                  if(book.lists[0]==undefined){
                      booksNotOnUsersLists.push(book);
                  }
                  else{
                      const allUserBooks=[];
                      lists.map((list) =>{
                          list.books.map((book)=>allUserBooks.push(book))
                      });
                      let found = allUserBooks.find((findbook)=>findbook.bookId == book.id);
                      if(found == undefined ){
                          found = true;
                          booksNotOnUsersLists.push(book);
                      }
                  }
              })
              const eightBooks = booksNotOnUsersLists.slice(-10,-1)
              //add 8 to suggestions
              setSuggestions(eightBooks)
            })
          .catch((error)=>{
              console.log(error)
              setError(error)
            })
          .finally(setLoading(false));
    }
  },[lists])


  if(error) return <p>Error</p>
  if(token !=null && loading) return <Loading/>
  return (
    <>
      <NavBar token={token} setToken={setToken}/>
      <Outlet context={[token,setToken,edit,setEdit,lists,setLists,suggestions,setSuggestions]}/>
    </>
  );
};

export default App;