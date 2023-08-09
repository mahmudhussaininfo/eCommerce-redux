import { toast } from "react-toastify";

//setup toast
export const createToast = (msg, type = "success") => {
  toast[type](msg);
};
