import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5001";

function Login({ onLogin }) {
  const [creds, setCreds] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
        const response = await fetch(`${API_URL}/api/login`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(creds),
        });
        if (response.ok) {
            onLogin && onLogin({username: creds.username});
            navigate("/stats");
        }
        else
            setError("Invalid username or password!");
    }
    catch (error) {
        console.error("Login error:", error);
        setError("Login failed!");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:{" "}
        <input
          type="text"
          onChange={(e) => {
            setCreds({ ...creds, username: e.target.value });
          }}
        ></input>
      </label>
      <br />
      <label>
        Password:{" "}
        <input
          type="password"
          onChange={(e) => {
            setCreds({ ...creds, password: e.target.value });
          }}
        ></input>
      </label>
      <br />
      <button type="submit">Login</button>
      <p>{error}</p>
    </form>
  );
}

export default Login;
