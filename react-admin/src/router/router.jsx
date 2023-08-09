import { createBrowserRouter } from "react-router-dom";
import privateRouter from "./privateRouter";
import publicRouter from "./publicRouter";

//create broswer route
const router = createBrowserRouter([...privateRouter, ...publicRouter]);

//export
export default router;
