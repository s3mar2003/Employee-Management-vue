// src/services/employeeService.js

export const EmployeeService = {
  getEmployees() {
    const employees = localStorage.getItem('employees')
    return employees ? JSON.parse(employees) : []
  },

  
  saveEmployees(employees) {
    localStorage.setItem('employees', JSON.stringify(employees))
  },

  addEmployee(employee) {
  const employees = this.getEmployees()
  employee.id = Date.now() // معرّف فريد بسيط
  employees.push(employee)
  this.saveEmployees(employees)
},

  deleteEmployee(id) {
    const employees = this.getEmployees().filter(emp => emp.id !== id)
    this.saveEmployees(employees)
  }
}

const defaultEmployee = {
  annualLeaveBalance: 21, 
  usedLeaves: 0,
  hireDate: new Date().toISOString()
  
}

