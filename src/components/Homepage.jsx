import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import Suggestions from "./Partials/Suggestions"
import CurrentlyReading from "./Partials/CurrentlyReading"
import Feed from "./Partials/Feed"


export default function HomePage (){
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    
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
 
    return (
        <div className="homepage">
            <h2>Homepage</h2>
            <CurrentlyReading lists={lists}/>
            <Suggestions/>
            <Feed lists={lists}/>
            {/* <CurrentlyReading/>
            <Suggestions/>
            <Feed/> */}
        </div>
        

    )
}


