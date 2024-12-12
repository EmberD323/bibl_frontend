import { Link,useNavigate} from "react-router-dom";
import Search from "./Search/Search"

function NavBar({token,setToken}) {
    const navigate = useNavigate()
    //remove token and route to homepage
    function handleLogout(){
        localStorage.removeItem("token");
        setToken(null);
        navigate('../login');
    }
    function handleNavigateHome(){
        navigate("../homepage")
    }
    //if token is null
    if(typeof token == "object"){
        return (
            <div className="navBar">
                <div className="heading" style={{cursor:"grab"}} onClick={handleNavigateHome}>
                    <h1>Bibl</h1>
                    <img width="60" height="60" src="https://img.icons8.com/connect/100/f2d398/book.png" alt="book"/>
                </div>
                
                <div className="user">
                    <Link to="login">
                        <div>Log in</div>
                    </Link>
                    <Link to="signup">
                        <div>Sign up</div>
                    </Link>
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="navBar">
                <div className="heading" style={{cursor:"grab"}} onClick={handleNavigateHome}>
                    <h1>Bibl</h1>
                    <img width="60" height="60" src="https://img.icons8.com/connect/100/f2d398/book.png" alt="book"/>
                </div>
                <div className="routes">
                    <Link to="homepage">Home</Link>
                    <Link to="myBooks">My Books</Link>
                </div>
                <Search/>
                <div style={{cursor:"grab"}} onClick={handleLogout} className="logout">
                    <img width="60" height="60" src="https://img.icons8.com/connect/100/f2d398/exit.png" alt="logout"/>
                </div>
            </div>
        )
    }
}

export default NavBar;