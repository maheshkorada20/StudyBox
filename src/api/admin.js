import axiosInstance from './axios';

export const adminAPI = {
  // Branch Management
  getBranches: () => axiosInstance.get('/api/admin/branches'),
  addBranch: (data) => axiosInstance.post('/api/admin/branches', data),
  updateBranch: (id, data) => axiosInstance.put(`/api/admin/branches/${id}`, data),
  deleteBranch: (id) => axiosInstance.delete(`/api/admin/branches/${id}`),

  // Year Management
  getYears: (branchId) => axiosInstance.get(`/api/admin/years/${branchId}`),
  addYear: (data) => axiosInstance.post('/api/admin/years', data),
  updateYear: (id, data) => axiosInstance.put(`/api/admin/years/${id}`, data),
  deleteYear: (id) => axiosInstance.delete(`/api/admin/years/${id}`),

  // Semester Management
  getSemesters: (yearId) => axiosInstance.get(`/api/admin/semesters/${yearId}`),
  addSemester: (data) => axiosInstance.post('/api/admin/semesters', data),
  updateSemester: (id, data) => axiosInstance.put(`/api/admin/semesters/${id}`, data),
  deleteSemester: (id) => axiosInstance.delete(`/api/admin/semesters/${id}`),

  // Subject Management
  getSubjects: (semesterId) => axiosInstance.get(`/api/admin/subjects/${semesterId}`),
  addSubject: (data) => axiosInstance.post('/api/admin/subjects', data),
  updateSubject: (id, data) => axiosInstance.put(`/api/admin/subjects/${id}`, data),
  deleteSubject: (id) => axiosInstance.delete(`/api/admin/subjects/${id}`),

  // Unit Management
  getUnits: (subjectId) => axiosInstance.get(`/api/admin/units/${subjectId}`),
  addUnit: (data) => axiosInstance.post('/api/admin/units', data),
  updateUnit: (id, data) => axiosInstance.put(`/api/admin/units/${id}`, data),
  deleteUnit: (id) => axiosInstance.delete(`/api/admin/units/${id}`),

  // Topic Management
  getTopics: (subjectId) => axiosInstance.get(`/api/admin/topics/${subjectId}`),
  addTopic: (data) => axiosInstance.post('/api/admin/topics', data),
  updateTopic: (id, data) => axiosInstance.put(`/api/admin/topics/${id}`, data),
  deleteTopic: (id) => axiosInstance.delete(`/api/admin/topics/${id}`),

  // Resource Management
  getResources: (topicId) => axiosInstance.get(`/api/admin/resources/${topicId}`),
  addResource: (formData) => axiosInstance.post('/api/admin/resources', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateResource: (id, formData) => axiosInstance.put(`/api/admin/resources/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteResource: (id) => axiosInstance.delete(`/api/admin/resources/${id}`),
};
