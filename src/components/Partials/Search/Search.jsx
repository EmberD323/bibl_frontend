import { useState } from "react";
import {useNavigate } from "react-router-dom";

export default function Search() {
    const[advanceVisibility,setAdvanceVisibility] = useState(false);
    const[query,setQuery] = useState("");
    const[title,setTitle] = useState("");
    const[author,setAuthor] = useState("");
    const[isbn,setISBN] = useState("");
    const[searchResult,setSearchResult] = useState("");
    const navigate = useNavigate()

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
    function resetAllInputs(){
        setQuery("");
        setTitle("")
        setAuthor("")
        setISBN("");

    }

    async function handleBasicSearch(e){
        e.preventDefault();
        const response = await fetch("https://www.googleapis.com/books/v1/volumes?q="+query+"&maxResults=40",{
            method: "GET",
        })
        if(response.status == 403){//if token is expired - log out and nav to login
            localStorage.removeItem("token");
            setToken(null);
            navigate('../login');
        }
        if(response.status != 200 && response.status != 403){//if theres errors
            const errors = await response.json();
            console.log(errors)
        }
        else{
            const thisSearchResult = await response.json()
            setSearchResult(thisSearchResult)
            resetAllInputs()
            navigate('../searchResult',{state:{thisSearchResult,query}});
        }
    }
    function handleAdvanceReveal(){
        setAdvanceVisibility(!advanceVisibility)
    }
    async function handleAdvanceSearch(e){
        e.preventDefault();
        let searchTerm="https://www.googleapis.com/books/v1/volumes?q=";
        if(author =="" && title =="" && isbn==""){return}
        if(author =="" && title =="" && isbn !=""){searchTerm = searchTerm+"isbn:"+isbn+"&maxResults=40"}
        if(author =="" && isbn =="" && title !=""){searchTerm = searchTerm+"intitle:"+title+"&maxResults=40"}
        if(title =="" && isbn =="" && author !=""){searchTerm = searchTerm+"inauthor:"+author+"&maxResults=40"}
        if(title =="" && isbn !="" && author !=""){searchTerm = searchTerm+"inauthor:"+author+"+isbn:"+isbn+"&maxResults=40"}
        if(author =="" && title !="" && isbn !=""){searchTerm = searchTerm+"intitle:"+title+"+isbn:"+isbn+"&maxResults=40"}
        if(isbn ==""&& title !=""&& author !=""){searchTerm = searchTerm+"intitle:"+title+"+inauthor:"+author+"&maxResults=40"}
        if(isbn !=""&& title !=""&& author !=""){searchTerm = searchTerm+"intitle:"+title+"+inauthor:"+author+"+isbn:"+isbn+"&maxResults=40"}        
        const response = await fetch(searchTerm,{
            method: "GET",
        })
        if(response.status == 403){//if token is expired - log out and nav to login
            localStorage.removeItem("token");
            setToken(null);
            navigate('../login');
        }
        if(response.status != 200 && response.status != 403){//if theres errors
            const errors = await response.json();
            console.log(errors)
        }
        else{
            const thisSearchResult = await response.json()
            setSearchResult(thisSearchResult)
            resetAllInputs()
            navigate('../searchResult',{state:{thisSearchResult,isbn,title,author}});
        }
    }
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

