// services/activityService.js

const ACTIVITY_KEY = 'employee_activities'

export const ActivityService = {
  getActivities() {
    return JSON.parse(localStorage.getItem(ACTIVITY_KEY) || '[]')
  },

 
  addActivity(activity) {
    const activities = JSON.parse(localStorage.getItem('activities') || '[]')
    activities.unshift(activity)
    localStorage.setItem('activities', JSON.stringify(activities))
  },

  clearActivities() {
    localStorage.removeItem(ACTIVITY_KEY)
  }
}


