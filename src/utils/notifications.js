import Swal from 'sweetalert2'

export function showSuccess(message = 'تمت العملية بنجاح') {
  Swal.fire({
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
}

export function showError(message = 'حدث خطأ ما') {
  Swal.fire({
    icon: 'error',
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
}
