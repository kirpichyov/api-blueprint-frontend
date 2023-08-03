import {Navigate, createBrowserRouter} from "react-router-dom";
import Projects from "../pages/projects";
import Project from "../pages/project";
import Auth from "../pages/auth";
import NotFound from "../pages/not-found";
import PrivateRoute from "./PrivateRouter";

const router = createBrowserRouter([
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/",
      element: <Navigate to="/projects" replace />,
    },
    {
      path: "/projects",
      element: <PrivateRoute component={Projects}/>,
    },
    {
      path: "/projects/:id",
      element: <PrivateRoute component={Project}/>,
    },
    {
      path: "/auth",
      element: <Auth />,
    },
  ]);


export default router;