import { createBrowserRouter } from "react-router-dom";
import privateRouter from "./privateRouter";
import publicRouter from "./publicRouter";
import Layout from "../Layout/Layout";

//create broswer route
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [...privateRouter, ...publicRouter],
  },
]);

//export
export default router;
