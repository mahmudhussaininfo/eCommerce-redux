import Forgot from "../pages/Auth/Forgot";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PublicGard from "./PublicGard";

//public router
const publicRouter = [
  {
    element: <PublicGard />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot",
        element: <Forgot />,
      },
    ],
  },
];

//export
export default publicRouter;
