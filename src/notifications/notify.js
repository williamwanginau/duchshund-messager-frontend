import { toast } from "react-toastify";

export const notify = (message, type) => {
  const options = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  switch (type) {
    case "info":
      toast.success(message, options);
      break;
    case "warning":
      toast.warning(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "success":
      toast.success(message, options);
      break;
    default:
      toast(message, options);
  }
};
