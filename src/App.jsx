import { useEffect, useState } from "react";
import "./styles/App.css"
import { Outlet } from "react-router-dom";

const App = () => {
  const [posts,setPosts]=useState(null);
  const [error,setError]=useState(null);
  const [loading,setLoading] = useState(true);
  const initalToken = localStorage.getItem("token");
  const [token,setToken] = useState(initalToken);
  const [edit,setEdit] = useState(true);
  const [users,setUsers] = useState(null);



  if(error) return <p>Error</p>
  if(loading) return <p>Loading</p>
  return (
    <>
      <Outlet context={[posts,setPosts,token,setToken,edit,setEdit,users,setUsers]}/>
    </>
  );
};

export default App;