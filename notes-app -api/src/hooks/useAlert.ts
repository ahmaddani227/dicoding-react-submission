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

  return {
    showAlert,
  };
};

export default useAlert;
