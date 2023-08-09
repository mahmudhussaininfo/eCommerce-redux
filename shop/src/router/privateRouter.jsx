import { Children } from "react";
import Layout from "../components/Layout/Layout";
import Users from "../components/Users/Users";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateGard from "./PrivateGard";
import Profile from "../pages/Profile/Profile";
import Roles from "../components/Role/Role";
import Permission from "../components/Permission/Permission";
import Mamu from "../components/Mamu/Mamu";

//private router
const privateRouter = [
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateGard />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/roles",
            element: <Roles />,
          },
          {
            path: "/permission",
            element: <Permission />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/mamu",
            element: <Mamu />,
          },
        ],
      },
    ],
  },
];

//export
export default privateRouter;
