import { useNavigate,useOutletContext } from "react-router-dom";

export default function Authors ({authors}){
    const navigate = useNavigate()

    async function handleAuthorSearch(e){
        let searchTerm="https://www.googleapis.com/books/v1/volumes?q=inauthor:"+e.target.textContent;
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
            navigate('../searchResult',{state:{thisSearchResult}});
        }
    }
    return (
        <div className="authors">
            <ul >
                {authors.map((author) => {
                    return <li key={crypto.randomUUID()} onClick={handleAuthorSearch} style={{cursor:"grab"}}>{author}</li>
                })}
            </ul>
        </div>
    )
}


