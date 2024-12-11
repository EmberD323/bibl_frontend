import { useNavigate,useOutletContext } from "react-router-dom";

export default function FeedBook({book}) {
    const [token,setToken,edit,setEdit,lists,setLists] = useOutletContext();

    const navigate = useNavigate()
    function handleBookOpen(e){
        navigate('../bookInfo',{state:{book}});
    }
    function handleListNavigation(e){
        let listID = e.target.id;
        let list = (lists.filter((listSearch)=>listSearch.id == listID))[0]
        navigate('../myBooks',{state:{list}});
    }

    if(book.rated){
        const dateTime = new Date((Date.parse(book.rated.ratings[0].assignedAt)))
        const dayMonthYear = dateTime.getDay()+"/"+dateTime.getDate()+"/"+dateTime.getFullYear();
        return(
        <>
        <div>You rated <span onClick={handleBookOpen} style={{cursor:"grab"}}>{book.rated.title}</span> {book.rated.ratings[0].rating} Stars </div>
        <div>Date: {dayMonthYear}</div>
        <img src={book.rated.imageURL}onClick={handleBookOpen} style={{cursor:"grab"}} alt="book_cover" />
        </>
    )}
    const dateTime = new Date((Date.parse(book.assignedAt)))
    const dayMonthYear = dateTime.getDay()+"/"+dateTime.getDate()+"/"+dateTime.getFullYear();
    return(
        <>
        <div>You added <span onClick={handleBookOpen} style={{cursor:"grab"}}>{book.book.title}</span> to 
        <span  id={book.list.id} style={{cursor:"grab"}} onClick={handleListNavigation}> {book.list.name}</span>
        </div>
        <div>Date: {dayMonthYear}</div>
        <img src={book.book.imageURL}onClick={handleBookOpen} style={{cursor:"grab"}} alt="book_cover" />
        </>
    )
}

 