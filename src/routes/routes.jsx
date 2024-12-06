import App from '../App.jsx';
import HomePage from '../components/Homepage.jsx';
import Signup from '../components/Users/Signup.jsx';
import Login from '../components/Users/Login.jsx';
import SearchResult from '../components/SearchResult.jsx';
import MyBooks from '../components/MyBooks.jsx';
import BookInfo from '../components/BookInfo.jsx';


const routes = [
  {
    path: "/",
    element: <App />,
    children:[
      { index: true, element: <HomePage /> },
      {path: "homepage",element: <HomePage/>},
      {path: "signup",element: <Signup/>},
      {path: "login",element: <Login/>},
      {path: "searchResult",element: <SearchResult/>},
      {path: "myBooks",element: <MyBooks/>},
      {path: "bookInfo",element: <BookInfo/>},
      
      
    ]
  },
];
export default routes;