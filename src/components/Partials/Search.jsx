import { useEffect, useState } from "react";

export default function Search() {
    const[advanceVisibility,setAdvanceVisibility] = useState(false);
    const[query,setQuery] = useState("");
    const[title,setTitle] = useState("");
    const[author,setAuthor] = useState("");
    const[isbn,setISBN] = useState("");

    const[searchResult,setSearchResult] = useState("");

    function handleQueryChange(e){
        setQuery(e.target.value)
    }
    function handleTitleChange(e){
        setTitle(e.target.value)
    }
    function handleAuthorChange(e){
        setAuthor(e.target.value)
    }
    function handleIsbnChange(e){
        setISBN(e.target.value)
    }
    async function handleBasicSearch(e){
        e.preventDefault();
        const response = await fetch("https://www.googleapis.com/books/v1/volumes?q="+query,{
            method: "GET",
        })
        if(response.status != 200){//if theres errors
            //const errors = await response.json();
            console.log(response)
        }
        else{
            const thisSearchResult = await response.json()
            setSearchResult(thisSearchResult)
        }
    }
    function handleAdvanceReveal(){
        setAdvanceVisibility(!advanceVisibility)
    }
    async function handleAdvanceSearch(e){
        e.preventDefault();
        let searchTerm="https://www.googleapis.com/books/v1/volumes?q=";
        if(author =="" && title =="" && isbn==""){return}
        if(author =="" && title =="" && isbn !=""){searchTerm = searchTerm+"isbn:"+isbn}
        if(author =="" && isbn =="" && title !=""){searchTerm = searchTerm+"intitle:"+title}
        if(title =="" && isbn =="" && author !=""){searchTerm = searchTerm+"inauthor:"+author}
        if(title =="" && isbn !="" && author !=""){searchTerm = searchTerm+"inauthor:"+author+"+isbn:"+isbn}
        if(author =="" && title !="" && isbn !=""){searchTerm = searchTerm+"intitle:"+title+"+isbn:"+isbn}
        if(isbn ==""&& title !=""&& author !=""){searchTerm = searchTerm+"intitle:"+title+"+inauthor:"+author}
        if(isbn !=""&& title !=""&& author !=""){searchTerm = searchTerm+"intitle:"+title+"+inauthor:"+author+"+isbn:"+isbn}        
        const response = await fetch(searchTerm,{
            method: "GET",
        })
        console.log(response)
        if(response.status != 200){//if theres errors
            //const errors = await response.json();
            console.log(response)
        }
        else{
            const thisSearchResult = await response.json()
            setSearchResult(thisSearchResult)
        }
    }
   //want book to include list info
    return (
       <div className="search">
        <form onSubmit={handleBasicSearch} className="basicSearch" >
            <input type="text" name="query" id="query" placeholder="Search for a book"value={query} onChange={handleQueryChange} required/>
            <button type="submit">Search</button>
        </form>
        <button  onClick={handleAdvanceReveal}>Advanced Search</button>
        <form onSubmit={handleAdvanceSearch} className="advancedSearch" id={String(advanceVisibility)}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" placeholder="Book Title"value={title} onChange={handleTitleChange}/>
            <label htmlFor="author">Author</label>
            <input type="text" name="author" id="author" placeholder="Name"value={author} onChange={handleAuthorChange}/>
            <label htmlFor="isbn">ISBN</label>
            <input type="number" name="isbn" id="isbn" placeholder=""value={isbn} onChange={handleIsbnChange}/>
            <button type="submit">Search</button>
        </form>

           
       </div>
    )

    
}

