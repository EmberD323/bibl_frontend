import App from '../App.jsx';
import PostPage from '../components/Posts/Postpage.jsx';
import HomePage from '../components/Homepage.jsx';
import PostEdit from '../components/Posts/PostEdit.jsx';
import Signup from '../components/Users/Signup.jsx';
import Login from '../components/Users/Login.jsx';
import CommentEdit from '../components/Comments/CommentEdit.jsx';
import NewPost from '../components/Posts/NewPost.jsx';
import NewComment from '../components/Comments/NewComment.jsx';


const routes = [
  {
    path: "/",
    element: <App />,
    children:[
      { index: true, element: <HomePage /> },
      {path: "homepage",element: <HomePage/>},
      {path: "signup",element: <Signup/>},
      {path: "login",element: <Login/>},
      {path: "newpost",element: <NewPost/>},
      {path: "newcomment",element: <NewComment/>},
      {path: "postpage/:id",element: <PostPage />},
      {path: "postedit/:id",element: <PostEdit />},
      {path: "postpage/:postid/commentedit/:commentid",element: <CommentEdit />},
      
    ]
  },
];
export default routes;