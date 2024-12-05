import { useEffect, useState } from "react";
import "./styles/App.css"
import { Outlet } from "react-router-dom";
import NavBar from "./components/Partials/NavBar"


const App = () => {


  const initalToken = localStorage.getItem("token");
  const [token,setToken] = useState(initalToken);
  const [edit,setEdit] = useState(true); 


  return (
    <>
      <NavBar token={token} setToken={setToken}/>
      <Outlet context={[token,setToken,edit,setEdit]}/>
    </>
  );
};

export default App;