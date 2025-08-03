import Swal from 'sweetalert2'

export async function confirmDelete(message = 'هل أنت متأكد؟', confirmText = 'نعم، احذفها!') {
  const result = await Swal.fire({
    title: message,
    text: 'لا يمكنك التراجع عن هذا الإجراء!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: 'إلغاء',
  })
  return result.isConfirmed
}
// async function deleteSalaryWithConfirm(index) {
//   const confirmed = await confirmDelete()
//   if (confirmed) {
//     salaries.value.splice(index, 1)
//     localStorage.setItem('salaries', JSON.stringify(salaries.value))
//     // يمكن تضيف إشعار نجاح هنا لو تريد
//   }
// }

async function confirmDeleteSalary(index) {
  const result = await Swal.fire({
    title: 'هل أنت متأكد؟',
    text: 'لا يمكنك التراجع بعد الحذف!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e3342f',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'نعم، احذف!',
    cancelButtonText: 'إلغاء'
  });

  if (result.isConfirmed) {
    deleteSalary(index);
    Swal.fire({
      title: 'تم الحذف!',
      text: 'تم حذف الراتب بنجاح.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    });
  }
}
