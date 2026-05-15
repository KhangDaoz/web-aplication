import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const API_URL = "http://localhost:5001";

function News() {
  return (
    <div>
      <h1>News</h1>
      <Outlet />
    </div>
  );
}

function NewsLists() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/newses`, {
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
        console.error("Error fetching news:", error);
        setError("An error occurred while fetching news.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading news...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ul>
      {data.map((item) => (
        <li key={item.slug}>
          <Link to={`/news/${item.slug}`}>
            <h3>{item.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function NewsItem() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/news/${slug}`, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const result = await response.json();
        setNews(result);
      }
      catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchData();
  }, [slug]);

  const handleEditNews = () => {
    navigate('/newnews', { state: { news } });
  };

  const handleDeleteNews = async () => {
    const shouldDelete = window.confirm("Delete this news item?");
    if (!shouldDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/news/${slug}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.ok) {
        navigate('/news');
      }
    }
    catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  const { title, description } = news;

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={handleEditNews}>Edit news</button>
      <button onClick={handleDeleteNews} style={{ marginLeft: 8 }}>Delete news</button>
    </div>
  );
}

function NewNews() {
  const location = useLocation();
  const editingNews = location.state?.news;
  const [action, setAction] = useState("add");
  const [status, setStatus] = useState("");
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    if (editingNews) {
      setValue("slug", editingNews.slug);
      setValue("title", editingNews.title);
      setValue("description", editingNews.description);
    }
  }, [editingNews, setValue]);

  const onSubmit = async (data) => {
    try {
      const endpoint = action === "update"
        ? `${API_URL}/api/news/${editingNews.slug}`
        : `${API_URL}/api/news`;
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

      if (response.ok) {
        setStatus(action === "update"
          ? "News updated successfully!"
          : "News created successfully!");
      }
    }
    catch (error) {
      console.error("Error:", error);
      setStatus("Operation failed!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span>Slug:</span><br />
        <input type="text" {...register("slug", { required: true })} /><br />
        {errors.slug && <div style={{ color: "red" }}>Slug is required</div>}
        <span>Title:</span><br />
        <input type="text" {...register("title", { required: true })} /><br />
        {errors.title && <div style={{ color: "red" }}>Title is required</div>}
        <span>Description:</span><br />
        <input type="text" {...register("description", { required: true })} /><br />
        {errors.description && <div style={{ color: "red" }}>Description is required</div>}
        <button type="submit" onClick={() => setAction("add")}>Add new</button>
        <button type="submit" onClick={() => setAction("update")} disabled={!editingNews}>Update</button>
        <p className="text-success">{status}</p>
      </form>
    </div>
  );
}

export { News, NewsLists, NewsItem, NewNews };