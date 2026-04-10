import { use, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
  useNavigate,
  Navigate
} from "react-router-dom";
import NoMatch from "./NoMatch";
import Home from "./Home";
import { Posts, PostLists, Post, NewPost} from "./Posts";
import { About } from "./About";
import Login from "./Login";
import Stats from "./Stats";
import ProtectedRoute from "./ProtectedRoute";

function AppLayout() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    function logOut() {
        setUser(null);
        navigate("/login");
    }

    return (
        <div>
            <nav>
                <Link to="/" style={{paddingRight: 5}}>Home</Link>
                <Link to="/posts" style={{paddingRight: 5}}>Posts</Link>
                <Link to="/about" style={{paddingRight: 5}}>About</Link>
                <span> | </span>
                {user && <Link to="/stats" style={{paddingRight: 5}}>Stats</Link>}
                {user && <Link to="/newpost" style={{paddingRight: 5}}>New Post</Link>}
                {!user && <Link to="/login" style={{paddingRight: 5}}>Login</Link>}
                {user &&  <span onClick={logOut} style={{cursor: "pointer", paddingLeft: 5}}>Logout</span>}
            </nav>
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={<Posts />} >
                    <Route index element={<PostLists />} />
                    <Route path=":slug" element={<Post />} />
                </Route>
                <Route path="/about" element={<About/>} />
                <Route path="/login" element={<Login onLogin={setUser}/>} />
                <Route path="/stats" element={<ProtectedRoute user={user}><Stats/></ProtectedRoute>} />
                <Route path="/newpost" element={<ProtectedRoute user={user}><NewPost/></ProtectedRoute>} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </div>
    )
}

export default AppLayout;