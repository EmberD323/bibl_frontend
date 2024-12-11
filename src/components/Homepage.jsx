import { useOutletContext,Link } from "react-router-dom";

import Suggestions from "./Partials/Suggestions/Suggestions"
import CurrentlyReading from "./Partials/CurrentlyReading/CurrentlyReading"
import Feed from "./Partials/Feed/Feed"

export default function HomePage (){
    const [token,setToken,edit,setEdit,lists,setLists,suggestions,setSuggestions] = useOutletContext();

    //if not logged in
    if(typeof token == "object"){
        return (
          <div className="notLoggedIn">
            <div>Welcome to Bibl.</div>
            <div><Link to="../login">Log in</Link> or <Link to="../signup">Sign Up</Link>!</div>
            <div className="dummy">
              <div>Or, use these dummy account credentials to try out the app:</div>
              <div>Email -  jane.doe@gmail.com</div>
              <div>Password - janespassword1</div>
            </div>
           </div>
          )
    }
    //if logged in
    return (
        <div className="homepage">
            <h2>Homepage</h2>
            <div className="content">
              <CurrentlyReading/>
              <Suggestions/> 
              <Feed/>
            </div>
        </div>    
    )
}


