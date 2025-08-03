import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '@/views/DashboardView.vue'
import SalaryView from '@/views/SalaryView.vue'

import AddEmployee from '@/views/AddEmployee.vue'
import EmployeesView from '@/views/EmployeesView.vue'
import UpdateEmployee from '@/components/EmployeeModal.vue'
import LeaveRequest from '@/components/LeaveRequest.vue'
import LeavesView from '@/views/LeavesView.vue'



const routes = [
  { path: '/', name: 'Dashboard', component: DashboardView },
  { path: '/leaves', name: 'leaves', component: LeavesView  },
  { path: '/salary', name: 'Salary', component: SalaryView },
  {path: '/employee',name:'employee',component:AddEmployee},
  { path: '/employees', name: 'Employees', component: EmployeesView },
  { path: '/updateEmployee', name: 'updateEmployees', component: UpdateEmployee },
  {  path: '/leaves/new', name: 'new-leave', component: LeaveRequest },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router