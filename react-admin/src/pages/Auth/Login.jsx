import { Link, useNavigate } from "react-router-dom";
import logoWhite from "../../assets/img/logo-white.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createToast } from "../../utils/toast";
import { setMessageEmpty } from "../../features/auth/authSlice";
import { loginUser } from "../../features/auth/authApiSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, message, user } = useSelector((state) => state.auth);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  //handle input change
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //handle Submit data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.email || !input.password) {
      createToast("all fields are required", "warn");
    } else {
      dispatch(loginUser(input));
      navigate("/");
    }
  };

  useEffect(() => {
    if (error) {
      createToast(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }
    if (user) {
      createToast(message, "success");
      // dispatch(setMessageEmpty());
    }
  }, [error, message, user]);
  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src={logoWhite} alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Login</h1>
                  <p className="account-subtitle">Access to our dashboard</p>

                  <form
                    action="https://dreamguys.co.in/demo/doccure/admin/index.html"
                    onSubmit={handleSubmit}
                  >
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={input.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Password"
                        name="password"
                        value={input.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                  </form>

                  <div className="text-center forgotpass">
                    <Link to="/forgot">Forgot Password?</Link>
                  </div>
                  <div className="login-or">
                    <span className="or-line"></span>
                    <span className="span-or">or</span>
                  </div>

                  <div className="text-center dont-have">
                    Don’t have an account? <Link to="/register">Register</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
