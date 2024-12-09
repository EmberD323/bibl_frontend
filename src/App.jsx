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
      .finally(setLoading(false));
},[edit])


if(error) return <p>Error</p>
if(loading) return <p>Loading</p>
  


  return (
    <>
      <NavBar token={token} setToken={setToken}/>
      <Outlet context={[token,setToken,edit,setEdit,lists,setLists]}/>
    </>
  );
};

export default App;