import Swal from "sweetalert2";

export const showAlert = (message: String): void => {
  const InfoAlert = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  InfoAlert.fire({
    icon: "success",
    title: message
  });
}