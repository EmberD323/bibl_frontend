import { Link,useNavigate} from "react-router-dom";

function NavBar({token,setToken}) {
    const navigate = useNavigate()
    //remove token and route to homepage
    function handleLogout(){
        localStorage.removeItem("token");
        setToken(null);
        navigate('../login');
    }
    //if token is null
    if(typeof token == "object"){
        return (
            <div className="navBar">
                <h1 className="heading">Bibl</h1>
                <div className="routes">
                    <Link to="homepage">
                        <div>Home</div>
                    </Link>
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
                <h1 className="heading">Messaging App</h1>
                <div className="routes">
                    <Link to="homepage">
                        <div>Home</div>
                    </Link>

                    {/* <Link to="mybooks"> */}
                        <div>My Books</div>
                    {/* </Link> */}
                    <div>Search</div>
                </div>
                
                <div className="user">
                    <button onClick={handleLogout}>Log out</button>
                </div>
            </div>
        )
    }
}

export default NavBar;