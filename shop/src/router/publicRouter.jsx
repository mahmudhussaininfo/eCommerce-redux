import Account from "../Pages/Account/Account";
import Blog from "../Pages/Blog/Blog";
import Cart from "../Pages/Cart/Cart";
import Checkout from "../Pages/Checkout/Checkout";
import Home from "../Pages/Home/Home";
import Shop from "../Pages/Shop/Shop";
import SingleShop from "../Pages/Shop/SingleShop";

//public router
const publicRouter = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/shop/:id",
    element: <SingleShop />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/account",
    element: <Account />,
  },
];

//export
export default publicRouter;
