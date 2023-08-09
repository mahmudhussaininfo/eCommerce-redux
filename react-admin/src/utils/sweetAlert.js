import swal from "sweetalert";

//basic sweetAlert
export const sweetAlertBasic = (msg) => {
  swal(msg);
};

//standard sweetAlert
export const sweetAlertStandard = (msg, type = "success") => {
  swal(msg.title, msg.msg, type);
};
