import { Link,useNavigate,useOutletContext} from "react-router-dom";
import { useEffect, useState } from "react";
import suggestionData from "../../modules/suggestionData"

export default function Suggestions({}) {
    const [token,setToken,edit,setEdit] = useOutletContext();

    // const [error,setError]=useState(null);
    // const [loading,setLoading] = useState(true);
    // const[example,setExample] =useState(null);
    // useEffect(()=>{
    //     fetch("https://www.googleapis.com/books/v1/volumes?q=you%20like+inauthor:stephen",{
    //         method: "GET",
    //       })
    //       .then((response)=>response.json())
    //       .then((json)=>{
    //         setExample(json.items[0].volumeInfo)
    //       })
    //       .catch((error)=>console.log(error))
    // },[])
    // /let {title,name,imageURL,category,description,pageCount,publishDate} = req.body;
    // useEffect(()=>{
    //     fetch(import.meta.env.VITE_BACKEND +"/lists/addBook",{
    //         method: "POST",
    //         mode:"cors",
    //         headers: {
    //           "Content-Type": "application/json",
    //           "authorization": "Bearer " +token
    //         },
    //         body: JSON.stringify({title:suggestionData[0].title,name:suggestionData[0].author_name,imageURL:suggestionData[0].imageURL,category:suggestionData[0].category,
    //             description:suggestionData[0].description,pageCount:suggestionData[0].pageCount,publishDate:suggestionData[0].publishDate
    //         }),
    //       })
    //       .then((response)=>console.log(response))
    //       //.catch((error)=>setError(error))
    //       //.finally(setLoading(false));
    // },[])

    function handleBookOpen(e){
        console.log(e)
        //action
     }
    
//   if(error) return <p>Error</p>
//   if(loading) return <p>Loading</p>
 
    
    
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

