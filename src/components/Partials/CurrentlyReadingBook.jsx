import { useNavigate } from "react-router-dom";

export default function CurrentlyReadingBook({book}) {
 
    const navigate = useNavigate()
    function handleBookOpen(e){
        console.log(book)
        navigate('../bookInfo',{state:{book}});

    }
    return(
        <>
        <img src={book.book.imageURL} alt="book_cover" onClick={handleBookOpen} style={{cursor:"grab"}}/>
        <div className="title" onClick={handleBookOpen} style={{cursor:"grab"}}>{book.book.title}</div>
        <div className="author" onClick={handleBookOpen} style={{cursor:"grab"}}>{book.book.author_name} </div>
        </>
    )
 
}

 