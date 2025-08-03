export const LeaveService = {
  getLeaveRequests() {
    const leaves = localStorage.getItem('leaveRequests')
    return leaves ? JSON.parse(leaves) : []
  },

  saveLeaveRequests(leaves) {
    localStorage.setItem('leaveRequests', JSON.stringify(leaves))
  },

  addLeaveRequest(leave) {
    const leaves = this.getLeaveRequests()
    leave.id = Date.now()
    leave.createdAt = new Date().toISOString()
    leaves.push(leave)
    this.saveLeaveRequests(leaves)
  },

 updateLeaveRequest(id, updatedLeave) {
  const leaves = this.getLeaveRequests(); // تجلب البيانات الصحيحة من localStorage
  const index = leaves.findIndex(l => l.id === id);
  if (index !== -1) {
    leaves[index] = updatedLeave; // تحديث السجل
    this.saveLeaveRequests(leaves); // حفظ البيانات المحدثة
  }
},



  deleteLeaveRequest(id) {
    const leaves = this.getLeaveRequests()
    const updatedLeaves = leaves.filter(l => l.id !== id)
    this.saveLeaveRequests(updatedLeaves)
  }
}