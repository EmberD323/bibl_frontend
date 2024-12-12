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
            <div className="query">
                <input type="text" name="query" id="query" value={query} onChange={handleQueryChange} required/>
                <button type="submit"><img width="22" height="22" src="https://img.icons8.com/ios-glyphs/30/f2d398/search--v1.png" alt="search--v1"/></button>
            </div>
            <div className="advance" onClick={handleAdvanceReveal} style={{cursor:"grab"}}>Advanced Search</div>


        </form>
        <form onSubmit={handleAdvanceSearch} className="advancedSearch" id={String(advanceVisibility)}>
            <div className="inputs">
                <div className="title">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" value={title} onChange={handleTitleChange}/>
                </div>
                <div className="author">
                    <label htmlFor="author">Author</label>
                    <input type="text" name="author" id="author" value={author} onChange={handleAuthorChange}/>
                </div>
                <div className="isbn">
                    <label htmlFor="isbn">ISBN</label>
                    <input type="number" name="isbn" id="isbn" value={isbn} onChange={handleIsbnChange}/>
                </div>
            </div>
            <button type="submit">  <img width="22" height="22" src="https://img.icons8.com/ios-glyphs/30/f2d398/search--v1.png" alt="search--v1"/></button>
        </form>
       </div>
    )
}

