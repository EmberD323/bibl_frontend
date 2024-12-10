import { useOutletContext} from "react-router-dom";
import SuggestionBook from "./SuggestionBook";
//will come back to suggestions -on pause
export default  function Suggestions() {
    const [token,setToken,edit,setEdit,lists,setLists,suggestions,setSuggestions] = useOutletContext();
    

    
    return (
       <div className="suggestions" >
           <div className="title" >Suggestions</div>
            {suggestions.map((book) => {
                    return(
                        <li key={book.id} >
                            <SuggestionBook book={book}/>
                        </li>
                    )
                })}
       </div>
    )

    
}

