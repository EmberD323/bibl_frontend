import { useOutletContext} from "react-router-dom";
import SuggestionBook from "./SuggestionBook";

export default  function Suggestions() {
    const [token,setToken,edit,setEdit,lists,setLists,suggestions,setSuggestions] = useOutletContext();

    if(suggestions == null) return
    
    return (
       <div className="suggestions" >
           <h2 className="title" >Suggestions</h2>
            <ul>
                {suggestions.map((book) => {
                        return(
                            <li key={book.id} >
                                <SuggestionBook book={book}/>
                            </li>
                        )
                    })}
            </ul>
       </div>
    )
}

