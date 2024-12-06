import { useNavigate } from "react-router-dom";

export default function FeedBook({book}) {
 
    const navigate = useNavigate()
    function handleBookOpen(e){
        navigate('../bookInfo',{state:{book}});

    }
    return(
        <>
        <div>You added <span onClick={handleBookOpen} style={{cursor:"grab"}}>{book.book.title}</span> to {book.list.name} </div>
        <div>Date: {book.assignedAt}</div>
        <img src={book.book.imageURL}onClick={handleBookOpen} style={{cursor:"grab"}} alt="book_cover" />
        </>
    )
 
}

 