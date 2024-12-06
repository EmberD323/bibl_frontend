import { Link,useNavigate} from "react-router-dom";

export default function CurrentlyReading({lists}) {
    if(lists == null){return}

    const CurrentlyReadingList = (lists.filter((list) => list.name == "Currently reading"))[0];
    function handleBookOpen(e){
       console.log(e)
    }
    function handleCurrentlyReadingOpen(e){
        console.log(e)
    }
    return (
       <div className="currentlyReading">
           <div className="title" onClick={handleCurrentlyReadingOpen}>Currently Reading</div>
           <ul>
                {CurrentlyReadingList.books.map((book) => {
                    return(
                        <li key={book.book.id} >
                            <img src={book.book.imageURL} alt="book_cover" onClick={handleBookOpen} style={{cursor:"grab"}}/>
                            <div className="title" onClick={handleBookOpen} style={{cursor:"grab"}}>{book.book.title}</div>
                            <div className="author" onClick={handleBookOpen} style={{cursor:"grab"}}>{book.book.author_name} </div>
                        </li>
                    )
                })}
            </ul>
       </div>
    )

    
}

