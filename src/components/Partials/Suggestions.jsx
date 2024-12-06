import { useOutletContext} from "react-router-dom";
import fetchSuggestion from "../../modules/suggestionData"
import SuggestionBook from "./SuggestionBook";
import { useEffect, useState } from "react";
//will come back to suggestions -on pause
export default  function Suggestions() {
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();
    const [suggestions, setSuggestions] = useState(null)
    // console.log(suggestionData)
    // if(suggestionData == undefined)
    useEffect(()=>{
        // let suggestionArray = fetchSuggestion();

    },[])

    
    




    return (
       <div className="suggestions">
           <div className="title" >Suggestions</div>
           {/* {suggestionData.map((book) => {
                return(
                    <li key={book.id} >
                        <SuggestionBook book={book}/>
                    </li>
                )
            })} */}
       </div>
    )

    
}

