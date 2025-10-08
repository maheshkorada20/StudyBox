


// // src/api/student.js
// import axiosInstance from './axios';

// const extractArray = (response) => {
//   if (!response || !response.data) return [];
//   if (Array.isArray(response.data)) return response.data;
//   if (Array.isArray(response.data.data)) return response.data.data;
//   return [];
// };

// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   if (!token) throw new Error('Token missing. Please login.');
//   return { Authorization: `Bearer ${token}` };
// };

// export const studentAPI = {
//   getBranches: async () => {
//     const res = await axiosInstance.get('/branches', { headers: getAuthHeaders() });
//     return extractArray(res);
//   },

//   getYears: async (branchId) => {
//     const res = await axiosInstance.get(`/years/${branchId}`, { headers: getAuthHeaders() });
//     return extractArray(res);
//   },

//   getSemesters: async (yearId) => {
//     const res = await axiosInstance.get(`/semesters/${yearId}`, { headers: getAuthHeaders() });
//     return extractArray(res);
//   },

//   getSubjects: async (semesterId) => {
//     const res = await axiosInstance.get(`/subjects/${semesterId}`, { headers: getAuthHeaders() });
//     return extractArray(res);
//   },

//   getUnits: async (subjectId) => {
//     const res = await axiosInstance.get(`/units/${subjectId}`, { headers: getAuthHeaders() });
//     return extractArray(res);
//   },

//   getTopics: async (unitId) => {
//     const res = await axiosInstance.get(`/topics/${unitId}`, { headers: getAuthHeaders() });
//     return extractArray(res);
//   },

//   getTopicsBySubject: async (subjectId) => {
//     const res = await axiosInstance.get(`/topics/subject/${subjectId}`, { headers: getAuthHeaders() });
//     return extractArray(res);
//   },

//   getResources: async (topicId) => {
//     const res = await axiosInstance.get(`/topic/${topicId}/resources`, { headers: getAuthHeaders() });
//     return extractArray(res);
//   },

//   // ✅ NEW: fetch single resource by ID
// getResourceById: async (id) => {
//   const res = await axiosInstance.get(`/resource/${id}`, { headers: getAuthHeaders() });
//   return res.data;
// },

//   searchResources: async (query) => {
//     const res = await axiosInstance.get(`/resources/search?q=${query}`, { headers: getAuthHeaders() });
//     return extractArray(res);
//   },

//   getUnit: async (unitId) => {
//     const res = await axiosInstance.get(`/unit/${unitId}`, { headers: getAuthHeaders() });
//     return res.data;
//   },

//   getSemester: async (semesterId) => {
//     const res = await axiosInstance.get(`/semester/${semesterId}`, { headers: getAuthHeaders() });
//     return res.data;
//   },

//   likeResource: async (id) =>
//     axiosInstance.post(`/resource/${id}/like`, {}, { headers: getAuthHeaders() }),

//   rateResource: async (id, rating) =>
//     axiosInstance.post(`/resource/${id}/rate`, { rating }, { headers: getAuthHeaders() }),

//   addFeedback: async (resourceId, feedback) =>
//     axiosInstance.post(`/feedback/${resourceId}`, feedback, { headers: getAuthHeaders() }),

//   getFeedbacks: async (resourceId) => {
//   const res = await axiosInstance.get(`/feedback/${resourceId}`, { headers: getAuthHeaders() });
//   return res.data.data || [];
// },


//   incrementView: async (id) =>
//     axiosInstance.post(`/resource/${id}/view`, {}, { headers: getAuthHeaders() })

//   };
import axiosInstance from './axios';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Helper to unwrap successResponse
const request = async (axiosCall) => {
  const res = await axiosCall();
  return res.data?.data; // automatically return the data payload
};

export const studentAPI = {
  // ----------------------
  // Browse hierarchy
  // ----------------------
  getBranches: () => request(() => axiosInstance.get('/api/student/branches', { headers: getAuthHeaders() })),
  getYears: (branchId) => request(() => axiosInstance.get(`/api/student/years/${branchId}`, { headers: getAuthHeaders() })),
  getSemesters: (yearId) => request(() => axiosInstance.get(`/api/student/semesters/${yearId}`, { headers: getAuthHeaders() })),
  getSubjects: (semesterId) => request(() => axiosInstance.get(`/api/student/subjects/${semesterId}`, { headers: getAuthHeaders() })),
  getUnits: (subjectId) => request(() => axiosInstance.get(`/api/student/units/${subjectId}`, { headers: getAuthHeaders() })),

  // ----------------------
  // Topics
  // ----------------------
  getTopicsBySubject: (subjectId) => request(() => axiosInstance.get(`/api/student/topics/subject/${subjectId}`, { headers: getAuthHeaders() })),
  getTopicsByUnit: (unitId) => request(() => axiosInstance.get(`/api/student/topics/unit/${unitId}`, { headers: getAuthHeaders() })),

  // ----------------------
  // Resources
  // ----------------------
  getResourcesByTopic: (topicId) => request(() => axiosInstance.get(`/api/student/topic/${topicId}/resources`, { headers: getAuthHeaders() })),
  getResourceById: (id) => request(() => axiosInstance.get(`/api/student/resource/${id}`, { headers: getAuthHeaders() })),

  // ----------------------
  // Search
  // ----------------------
  searchResources: (query) => request(() => axiosInstance.get(`/api/student/search-resources?q=${encodeURIComponent(query)}`, { headers: getAuthHeaders() })),

  // ----------------------
  // Dashboard features
  // ----------------------
  getRecentResources: () => request(() => axiosInstance.get('/api/student/resources/recent', { headers: getAuthHeaders() })),
  getRecentlyViewed: () => request(() => axiosInstance.get('/api/student/resources/recently-viewed', { headers: getAuthHeaders() })),
  getFavorites: () => request(() => axiosInstance.get('/api/student/resources/favorites', { headers: getAuthHeaders() })),
  toggleFavorite: (id) => request(() => axiosInstance.post(`/api/student/resource/${id}/favorite`, {}, { headers: getAuthHeaders() })),

  // ----------------------
  // Feedback
  // ----------------------
  addFeedback: (resourceId, data) => request(() => axiosInstance.post(`/api/student/feedback/${resourceId}`, data, { headers: getAuthHeaders() })),
  getFeedbacks: (resourceId) => request(() => axiosInstance.get(`/api/student/feedback/${resourceId}`, { headers: getAuthHeaders() })),

  // ----------------------
  // Resource interactions
  // ----------------------
  likeResource: (id) => request(() => axiosInstance.post(`/api/student/resource/${id}/like`, {}, { headers: getAuthHeaders() })),
  rateResource: (id, rating) => request(() => axiosInstance.post(`/api/student/resource/${id}/rate`, { rating }, { headers: getAuthHeaders() })),
  incrementView: (id) => request(() => axiosInstance.post(`/api/student/resource/${id}/view`, {}, { headers: getAuthHeaders() })),
};
