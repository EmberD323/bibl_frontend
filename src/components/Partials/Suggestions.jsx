import { Link,useNavigate,useOutletContext} from "react-router-dom";
import { useEffect, useState } from "react";
import suggestionData from "../../modules/suggestionData"

export default function Suggestions({}) {
    const [token,setToken,edit,setEdit] = useOutletContext();

    function handleBookOpen(e){
        console.log(e)
        //action
     }
    
    return (
       <div className="suggestions">
           <div className="title" >Suggestions</div>
           {suggestionData.map((book) => {
                    return(
                        <li key={book.id} >
                            <img src={book.imageURL} alt="book_cover" onClick={handleBookOpen} style={{cursor:"grab"}}/>
                            <div className="title" onClick={handleBookOpen} style={{cursor:"grab"}}>{book.title}</div>
                            <div className="author" onClick={handleBookOpen} style={{cursor:"grab"}}>{book.author_name} </div>
                        </li>
                    )
            })}
       </div>
    )

    
}

