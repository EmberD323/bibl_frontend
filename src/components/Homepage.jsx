import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

import CurrentlyReading from "./Partials/CurrentlyReading"

export default function HomePage (){
    const [token,setToken,edit,setEdit] = useOutletContext();
    const [lists,setLists]=useState(null);
    const [error,setError]=useState(null);
    const [loading,setLoading] = useState(true);
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
    //get all lists by user
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
          .catch((error)=>setError(error))
          .finally(setLoading(false));
    },[edit])
    

  if(error) return <p>Error</p>
  if(loading) return <p>Loading</p>
    return (
        <div className="homepage">
            <h2>Homepage</h2>
            <CurrentlyReading lists={lists}/>
            {/* <CurrentlyReading/>
            <Suggestions/>
            <Feed/> */}
        </div>
        

    )
}


