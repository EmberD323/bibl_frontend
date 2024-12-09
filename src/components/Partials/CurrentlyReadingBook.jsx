import { useNavigate } from "react-router-dom";

export default function CurrentlyReadingBook({book}) {
 
    const navigate = useNavigate()
    function handleBookOpen(e){
        navigate('../bookInfo',{state:{book}});

    }
    async function handleAuthorSearch(e){
        let searchTerm="https://www.googleapis.com/books/v1/volumes?q=inauthor:"+book.book.author_name;
        const response = await fetch(searchTerm,{
            method: "GET",
        })
        if(response.status != 200){//if theres errors
            const errors = await response.json();
            console.log(errors)
        }
        else{
            const thisSearchResult = await response.json()
            navigate('../searchResult',{state:{thisSearchResult}});

        }
    }
    
    return(
        <>
        <img src={book.book.imageURL} alt="book_cover" onClick={handleBookOpen} style={{cursor:"grab"}}/>
        <div className="title" onClick={handleBookOpen} style={{cursor:"grab"}}>{book.book.title}</div>
        <div className="author" onClick={handleAuthorSearch} style={{cursor:"grab"}}>{book.book.author_name} </div>
        </>
    )
 
}

 