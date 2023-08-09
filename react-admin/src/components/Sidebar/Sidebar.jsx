import { Link, useLocation } from "react-router-dom";
import { BsPersonFillGear } from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";
import { BiUserCheck } from "react-icons/bi";
import useAuthUser from "../../hooks/useAuthUser";

const Sidebar = () => {
  const location = useLocation();
  //get logged in user details
  const { user } = useAuthUser();

  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>
              {user?.role?.permissions?.includes("Dashboard") && (
                <li className={` ${location.pathname === "/" ? "active" : ""}`}>
                  <Link to="/">
                    <i className="fe fe-home"></i> <span>Dashboard</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("User") && (
                <li
                  className={`${
                    location.pathname === "/users" ? "active" : ""
                  }`}
                >
                  <Link to="/users">
                    <i>
                      <BiUserCheck />
                    </i>{" "}
                    <span>Users</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Product") && (
                <li className="">
                  <Link to="/users">
                    <i>
                      <BiUserCheck />
                    </i>{" "}
                    <span>Products</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Catagory") && (
                <li className="">
                  <Link to="/users">
                    <i>
                      <BiUserCheck />
                    </i>{" "}
                    <span>Catagory</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Brands") && (
                <li
                  className={`${
                    location.pathname === "/brands" ? "active" : ""
                  }`}
                >
                  <Link to="/brands">
                    <i>
                      <BiUserCheck />
                    </i>{" "}
                    <span>Brands</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Order") && (
                <li
                  className={`${
                    location.pathname === "/order" ? "active" : ""
                  }`}
                >
                  <Link to="/order">
                    <i>
                      <BiUserCheck />
                    </i>{" "}
                    <span>Order</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Tag") && (
                <li
                  className={`${location.pathname === "/tag" ? "active" : ""}`}
                >
                  <Link to="/tag">
                    <i>
                      <BiUserCheck />
                    </i>{" "}
                    <span>Tag</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Role") && (
                <li
                  className={`${
                    location.pathname === "/roles" ? "active" : ""
                  }`}
                >
                  <Link to="/roles">
                    <i className="fe fe-user"></i> <span>Roles</span>
                  </Link>
                </li>
              )}
              {user?.role?.permissions?.includes("Permission") && (
                <li
                  className={`${
                    location.pathname === "/permission" ? "active" : ""
                  }`}
                >
                  <Link to="/permission">
                    <i>
                      <AiFillLock />
                    </i>{" "}
                    <span>Permission</span>
                  </Link>
                </li>
              )}

              <li className="menu-title">pages</li>
              <li
                className={`${
                  location.pathname === "/profile" ? "active" : ""
                }`}
              >
                <Link to="/profile">
                  <i>
                    <BsPersonFillGear />
                  </i>{" "}
                  <span>Profile</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
