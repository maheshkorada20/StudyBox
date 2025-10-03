import axiosInstance from './axios';

export const studentAPI = {
  // Get all branches
  getBranches: () => axiosInstance.get('/api/student/branches'),

  // Get years for a branch
  getYears: (branchId) => axiosInstance.get(`/api/student/years/${branchId}`),

  // Get semesters for a year
  getSemesters: (yearId) => axiosInstance.get(`/api/student/semesters/${yearId}`),

  // Get subjects for a semester
  getSubjects: (semesterId) => axiosInstance.get(`/api/student/subjects/${semesterId}`),

  // Get units for a subject
  getUnits: (subjectId) => axiosInstance.get(`/api/student/units/${subjectId}`),

  // Get topics for a unit
  getTopics: (unitId) => axiosInstance.get(`/api/student/topics/${unitId}`),

  // Get resources for a topic
  getResources: (topicId) => axiosInstance.get(`/api/student/resources/${topicId}`),

  // Get single resource by ID
  getResourceById: (resourceId) => axiosInstance.get(`/api/student/resource/${resourceId}`),

  // Search resources
  searchResources: (query) => axiosInstance.get(`/api/student/search?query=${query}`),

  // Like a resource
  likeResource: (resourceId) => axiosInstance.post(`/api/student/resource/${resourceId}/like`),

  // Rate a resource
  rateResource: (resourceId, rating) => 
    axiosInstance.post(`/api/student/resource/${resourceId}/rate`, { rating }),

  // Add feedback
  addFeedback: (resourceId, feedback) => 
    axiosInstance.post(`/api/student/resource/${resourceId}/feedback`, feedback),

  // Increment view count
  incrementView: (resourceId) => 
    axiosInstance.post(`/api/student/resource/${resourceId}/view`),
};
