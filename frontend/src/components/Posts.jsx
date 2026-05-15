import { useEffect, useState } from "react";
import { Link, Outlet, useParams, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

const API_URL = "http://localhost:5001";

function Posts() {
  return (
    <div>
      <h1>Blog</h1>
      <Outlet />
    </div>
  );
}

function PostLists() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/posts`, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      }
      catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <ul>
      {data.map((d) => (
        <li key = {d.slug}>
          <Link to={`/posts/${d.slug}`}>
            <h3>{d.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function Post({ user }) {
  const { slug } = useParams();
  const [post, setPost] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/post/${slug}`, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const result = await response.json();
        setPost(result);
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [slug]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const text = e.target.text.value;
    try {
      const response = await fetch(`${API_URL}/api/post/${slug}/comment`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({name, text})
      });
      if(response.ok) {
        const updatedPost = await response.json();
        setPost(updatedPost);
        e.target.reset();
      }
    }
    catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  const handleEditPost = () => {
    navigate('/newpost', {state: {post}});
  }

  const {title, description} = post;
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>

      <p>Comment: </p>
      <ul>
        {post.comments && post.comments.map((c, index) => (
          <li key={index}>{c.name}: {c.text}</li>
        ))}
      </ul>

      <form onSubmit={handleCommentSubmit}>
        <label>Name: <input type="text" name="name"></input></label><br/>
        <label>Text: <input type="text" name="text"></input></label>
        <button type="submit">Add comment</button>
      </form>

      <button onClick={handleEditPost}>Edit post</button>
    </div>
  )
}

function NewPost() {
  const location = useLocation();
  const editingPost = location.state?.post;
  const [action, setAction] = useState("add");
  const [status, setStatus] = useState("");
  const {register, handleSubmit, formState: {errors}, setValue} = useForm();

  useEffect(() => {
    if (editingPost) {
      setValue("slug", editingPost.slug);
      setValue("title", editingPost.title);
      setValue("description", editingPost.description);
    }
  }, [editingPost]);

  const onSubmit = async (data) => {
    try {
      const endpoint = action === "update" 
        ? `${API_URL}/api/post/${editingPost.slug}` 
        : `${API_URL}/api/post`;
      const method = action === "update" ? "PATCH" : "POST";
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(data)
      });
      
      if(response.ok) {
        setStatus(action === "update" 
          ? "Post updated successfully!" 
          : "Post created successfully!");
      }
    }
    catch (error) {
      console.error("Error:", error);
      setStatus("Operation failed!");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span>Slug:</span><br/>
        <input type="text" {...register("slug", {required: true})} /><br/>
        {errors.slug && <div style={{color: "red"}}>Slug is required</div>}
        <span>Title:</span><br/>
        <input type="text" {...register("title", {required: true})} /><br/>
        {errors.title && <div style={{color: "red"}}>Title is required</div>}
        <span>Description:</span><br/>
        <input type="text" {...register("description", {required: true})} /><br/>
        {errors.description && <div style={{color: "red"}}>Description is required</div>}
        <button type="submit" onClick={() => setAction("add")}>Add new</button>
        <button type="submit" onClick={() => setAction("update")} disabled={!editingPost}>Update</button>
        <p className="text-success">{status}</p>
      </form>
    </div>
  )
}

export { Posts, PostLists, Post, NewPost};
