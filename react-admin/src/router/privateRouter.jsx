import { Children } from "react";
import Layout from "../components/Layout/Layout";
import Users from "../components/Users/Users";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateGard from "./PrivateGard";
import Profile from "../pages/Profile/Profile";
import Roles from "../components/Role/Role";
import Permission from "../components/Permission/Permission";
import Brand from "../pages/Brand/Brand";

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
            path: "/brand",
            element: <Brand />,
          },
        ],
      },
    ],
  },
];

//export
export default privateRouter;
