import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";

//create store
const Store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefalultMiddlewares) => getDefalultMiddlewares(),
  devTools: true,
});

//export
export default Store;
