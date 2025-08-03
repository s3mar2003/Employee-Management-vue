export const sampleEmployees = [
  {
    id: 'emp01',
    name: 'أحمد محمد',
    department: 'التسويق',
    contractType: 'دوام كامل',
    email: 'ahmed@test.com',
    phone: '777123456',
    address: 'عدن، اليمن',
    rating: 4.5,
    finalSalary: 1500,
    salaryDetails: {
      base: 1000,
      bonus: 300,
      deductions: 100
    },
    leaves: [
      { date: '2025-07-10', reason: 'إجازة سنوية' },
      { date: '2025-07-20', reason: 'إجازة طارئة' }
    ]
  },
  {
    id: 'emp02',
    name: 'منى علي',
    department: 'الموارد البشرية',
    contractType: 'دوام جزئي',
    email: 'mona@test.com',
    phone: '777654321',
    address: 'صنعاء، اليمن',
    rating: 4.2,
    finalSalary: 1200,
    salaryDetails: {
      base: 900,
      bonus: 200,
      deductions: 0
    },
    leaves: [
      { date: '2025-07-15', reason: 'إجازة أمومة' }
    ]
  }
]
