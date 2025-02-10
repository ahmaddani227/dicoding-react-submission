import Swal from "sweetalert2";

const useAlert = () => {
  const showAlert = (
    title: string,
    text: string,
    icon: "success" | "error" | "warning"
  ) => {
    Swal.fire({
      title,
      text,
      icon,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const showAlertToast = (
    title: string,
    icon: "success" | "warning" = "success"
  ) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    Toast.fire({
      icon,
      title,
    });
  };

  return {
    showAlert,
    showAlertToast,
  };
};

export default useAlert;
