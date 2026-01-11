import { Bounce, toast, type ToastOptions } from "react-toastify";

/**
 * Show error toast
 */
const ShowErrorToast = (message: string): void => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  } as ToastOptions);
};

/**
 * Show success toast
 */
const ShowSuccessToast = (message: string): void => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  } as ToastOptions);
};

export { ShowErrorToast, ShowSuccessToast };
