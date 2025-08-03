export const SalaryService = {
 getSalaries() {
    return JSON.parse(localStorage.getItem('salaries')) || []
  },

  getSalaryByEmployeeId(employeeId) {
    return this.getSalaries().find(s => s.employeeId === employeeId)
  },


  saveSalary(salaryData) {
    const salaries = this.getSalaries()
    const existingIndex = salaries.findIndex(s => s.employeeId === salaryData.employeeId)
    
    if (existingIndex >= 0) {
      salaries[existingIndex] = salaryData
    } else {
      salaries.push(salaryData)
    }
    
    localStorage.setItem('salaries', JSON.stringify(salaries))
  },

  getSalaryByEmployeeId(employeeId) {
    return this.getSalaries().find(s => s.employeeId === employeeId)
  },

  deleteSalary(employeeId) {
    const salaries = this.getSalaries().filter(s => s.employeeId !== employeeId)
    localStorage.setItem('salaries', JSON.stringify(salaries))
  }
}