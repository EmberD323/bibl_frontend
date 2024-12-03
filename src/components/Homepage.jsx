import { useOutletContext } from "react-router-dom";

export default function HomePage (){
    const [posts,setPosts,token,setToken,edit,setEdit,users,setUsers] = useOutletContext();
  
    return (
        <div className="homepage">
            <h2>All Posts</h2>
        </div>
    )
}


