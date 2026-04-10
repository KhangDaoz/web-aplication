import { Outlet } from "react-router-dom";

function About() {
  return (
    <div>
      <h1>About</h1>
      <p>Welcome to about page</p>
      <Outlet />
    </div>
  );
}

export { About };
