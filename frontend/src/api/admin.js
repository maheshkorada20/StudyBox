// import axiosInstance from './axios';

// export const adminAPI = {
//   // Branch Management
//   getBranches: () => axiosInstance.get('/api/admin/branches'),
//   addBranch: (data) => axiosInstance.post('/api/admin/branches', data),
//   updateBranch: (id, data) => axiosInstance.put(`/api/admin/branches/${id}`, data),
//   deleteBranch: (id) => axiosInstance.delete(`/api/admin/branches/${id}`),

//   // Year Management
//   getYears: (branchId) => axiosInstance.get(`/api/admin/years/${branchId}`),
//   addYear: (data) => axiosInstance.post('/api/admin/years', data),
//   updateYear: (id, data) => axiosInstance.put(`/api/admin/years/${id}`, data),
//   deleteYear: (id) => axiosInstance.delete(`/api/admin/years/${id}`),

//   // Semester Management
//   getSemesters: (yearId) => axiosInstance.get(`/api/admin/semesters/${yearId}`),
//   addSemester: (data) => axiosInstance.post('/api/admin/semesters', data),
//   updateSemester: (id, data) => axiosInstance.put(`/api/admin/semesters/${id}`, data),
//   deleteSemester: (id) => axiosInstance.delete(`/api/admin/semesters/${id}`),

//   // Subject Management
//   getSubjects: (semesterId) => axiosInstance.get(`/api/admin/subjects/${semesterId}`),
//   addSubject: (data) => axiosInstance.post('/api/admin/subjects', data),
//   updateSubject: (id, data) => axiosInstance.put(`/api/admin/subjects/${id}`, data),
//   deleteSubject: (id) => axiosInstance.delete(`/api/admin/subjects/${id}`),

//   // Unit Management
//   getUnits: (subjectId) => axiosInstance.get(`/api/admin/units/${subjectId}`),
//   addUnit: (data) => axiosInstance.post('/api/admin/units', data),
//   updateUnit: (id, data) => axiosInstance.put(`/api/admin/units/${id}`, data),
//   deleteUnit: (id) => axiosInstance.delete(`/api/admin/units/${id}`),

//   // Topic Management
//   getTopics: (subjectId) => axiosInstance.get(`/api/admin/topics/${subjectId}`),
//   addTopic: (data) => axiosInstance.post('/api/admin/topics', data),
//   updateTopic: (id, data) => axiosInstance.put(`/api/admin/topics/${id}`, data),
//   deleteTopic: (id) => axiosInstance.delete(`/api/admin/topics/${id}`),

//   // Resource Management
//   getResources: (topicId) => axiosInstance.get(`/api/admin/resources/${topicId}`),
//   addResource: (formData) => axiosInstance.post('/api/admin/resources', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' }
//   }),
//   updateResource: (id, formData) => axiosInstance.put(`/api/admin/resources/${id}`, formData, {
//     headers: { 'Content-Type': 'multipart/form-data' }
//   }),
//   deleteResource: (id) => axiosInstance.delete(`/api/admin/resources/${id}`),
// };

// import axiosInstance from './axios';

//student
// export const adminAPI = {
//   // ------------------------
//   // Public routes: signup & login
//   // ------------------------
//   signup: (data) => axiosInstance.post('/api/admin/signup', data),
//   login: (data) => axiosInstance.post('/api/admin/login', data),

//   // ------------------------
//   // Branch Management
//   // ------------------------
//   getBranches: () => axiosInstance.get('/api/admin/branch'),
//   addBranch: (data) => axiosInstance.post('/api/admin/branch', data),
//   updateBranch: (id, data) => axiosInstance.put(`/api/admin/branch/${id}`, data),
//   deleteBranch: (id) => axiosInstance.delete(`/api/admin/branch/${id}`),

//   // ------------------------
//   // Year Management
//   // ------------------------
//   getYears: (branchId) => axiosInstance.get(`/api/admin/branch/${branchId}/year`),
//   addYear: (branchId, data) => axiosInstance.post(`/api/admin/branch/${branchId}/year`, data),
//   updateYear: (id, data) => axiosInstance.put(`/api/admin/year/${id}`, data),
//   deleteYear: (id) => axiosInstance.delete(`/api/admin/year/${id}`),

//   // ------------------------
//   // Semester Management
//   // ------------------------
//   getSemesters: (yearId) => axiosInstance.get(`/api/admin/year/${yearId}/semester`),
//   addSemester: (yearId, data) => axiosInstance.post(`/api/admin/year/${yearId}/semester`, data),
//   updateSemester: (id, data) => axiosInstance.put(`/api/admin/semester/${id}`, data),
//   deleteSemester: (id) => axiosInstance.delete(`/api/admin/semester/${id}`),

//   // ------------------------
//   // Subject Management
//   // ------------------------
//   getSubjects: (semesterId) => axiosInstance.get(`/api/admin/semester/${semesterId}/subject`),
//   addSubject: (semesterId, data) => axiosInstance.post(`/api/admin/semester/${semesterId}/subject`, data),
//   updateSubject: (id, data) => axiosInstance.put(`/api/admin/subject/${id}`, data),
//   deleteSubject: (id) => axiosInstance.delete(`/api/admin/subject/${id}`),

//   // ------------------------
//   // Unit Management
//   // ------------------------
//   getUnits: (subjectId) => axiosInstance.get(`/api/admin/subject/${subjectId}/unit`),
//   addUnit: (subjectId, data) => axiosInstance.post(`/api/admin/subject/${subjectId}/unit`, data),
//   updateUnit: (id, data) => axiosInstance.put(`/api/admin/unit/${id}`, data),
//   deleteUnit: (id) => axiosInstance.delete(`/api/admin/unit/${id}`),

//   // ------------------------
//   // Topic Management
//   // ------------------------
//   getTopics: (unitId) => axiosInstance.get(`/api/admin/unit/${unitId}/topics`), // backend must implement GET if needed
//   addTopic: (subjectOrUnitId, data) => axiosInstance.post(`/api/admin/${subjectOrUnitId}/topic`, data),
//   updateTopic: (id, data) => axiosInstance.put(`/api/admin/topic/${id}`, data),
//   deleteTopic: (id) => axiosInstance.delete(`/api/admin/topic/${id}`),

//   // ------------------------
//   // Resource Management
//   // ------------------------
//   getResources: () => axiosInstance.get('/api/admin/resources'),
//   addResource: (topicId, formData) =>
//     axiosInstance.post(`/api/admin/topic/${topicId}/resource`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     }),
//   updateResource: (id, formData) =>
//     axiosInstance.put(`/api/admin/resource/${id}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     }),
//   deleteResource: (id) => axiosInstance.delete(`/api/admin/resource/${id}`),
// };
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

export const adminAPI = {
  // ----------------------
  // Auth
  // ----------------------
  signup: (data) => request(() => axiosInstance.post('/api/admin/signup', data)),
  login: (data) => request(() => axiosInstance.post('/api/admin/login', data)),

  // ----------------------
  // Dashboard
  // ----------------------
  getDashboard: () =>
    request(() => axiosInstance.get('/api/admin/dashboard', { headers: getAuthHeaders() })),
  getResources: () =>
    request(() => axiosInstance.get('/api/admin/resources', { headers: getAuthHeaders() })),

  // ----------------------
  // Branches
  // ----------------------
  getBranches: () =>
    request(() => axiosInstance.get('/api/admin/branches', { headers: getAuthHeaders() })),
  addBranch: (data) =>
    request(() => axiosInstance.post('/api/admin/branch', data, { headers: getAuthHeaders() })),
  updateBranch: (id, data) =>
    request(() => axiosInstance.put(`/api/admin/branch/${id}`, data, { headers: getAuthHeaders() })),
  deleteBranch: (id) =>
    request(() => axiosInstance.delete(`/api/admin/branch/${id}`, { headers: getAuthHeaders() })),

  // ----------------------
  // Years
  // ----------------------
  getYears: (branchId) =>
    request(() => axiosInstance.get(`/api/admin/branches/${branchId}/years`, { headers: getAuthHeaders() })),
  addYear: (branchId, data) =>
    request(() => axiosInstance.post(`/api/admin/branches/${branchId}/years`, data, { headers: getAuthHeaders() })),
  updateYear: (id, data) =>
    request(() => axiosInstance.put(`/api/admin/years/${id}`, data, { headers: getAuthHeaders() })),
  deleteYear: (id) =>
    request(() => axiosInstance.delete(`/api/admin/years/${id}`, { headers: getAuthHeaders() })),

  // ----------------------
  // Semesters
  // ----------------------
  getSemesters: (yearId) =>
    request(() => axiosInstance.get(`/api/admin/years/${yearId}/semesters`, { headers: getAuthHeaders() })),
  addSemester: (yearId, data) =>
    request(() => axiosInstance.post(`/api/admin/years/${yearId}/semesters`, data, { headers: getAuthHeaders() })),
  updateSemester: (id, data) =>
    request(() => axiosInstance.put(`/api/admin/semesters/${id}`, data, { headers: getAuthHeaders() })),
  deleteSemester: (id) =>
    request(() => axiosInstance.delete(`/api/admin/semesters/${id}`, { headers: getAuthHeaders() })),

  // ----------------------
  // Subjects
  // ----------------------
  getSubjects: (semesterId) =>
    request(() => axiosInstance.get(`/api/admin/semesters/${semesterId}/subjects`, { headers: getAuthHeaders() })),
  addSubject: (semesterId, data) =>
    request(() => axiosInstance.post(`/api/admin/semesters/${semesterId}/subjects`, data, { headers: getAuthHeaders() })),
  updateSubject: (id, data) =>
    request(() => axiosInstance.put(`/api/admin/subjects/${id}`, data, { headers: getAuthHeaders() })),
  deleteSubject: (id) =>
    request(() => axiosInstance.delete(`/api/admin/subjects/${id}`, { headers: getAuthHeaders() })),

  // ----------------------
  // Units
  // ----------------------
  getUnits: (subjectId) =>
    request(() => axiosInstance.get(`/api/admin/subjects/${subjectId}/units`, { headers: getAuthHeaders() })),
  addUnit: (subjectId, data) =>
    request(() => axiosInstance.post(`/api/admin/subjects/${subjectId}/units`, data, { headers: getAuthHeaders() })),
  updateUnit: (id, data) =>
    request(() => axiosInstance.put(`/api/admin/units/${id}`, data, { headers: getAuthHeaders() })),
  deleteUnit: (id) =>
    request(() => axiosInstance.delete(`/api/admin/units/${id}`, { headers: getAuthHeaders() })),

  // ----------------------
  // Topics
  // ----------------------
  getTopicsByUnit: (unitId) =>
    request(() => axiosInstance.get(`/api/admin/units/${unitId}/topics`, { headers: getAuthHeaders() })),
  getTopicsBySubject: (subjectId) =>
    request(() => axiosInstance.get(`/api/admin/subjects/${subjectId}/topics`, { headers: getAuthHeaders() })),
  addTopic: (subjectOrUnitId, data) =>
    request(() => axiosInstance.post(`/api/admin/${subjectOrUnitId}/topics`, data, { headers: getAuthHeaders() })),
  updateTopic: (id, data) =>
    request(() => axiosInstance.put(`/api/admin/topics/${id}`, data, { headers: getAuthHeaders() })),
  deleteTopic: (id) =>
    request(() => axiosInstance.delete(`/api/admin/topics/${id}`, { headers: getAuthHeaders() })),

// ----------------------
// Resources
// ----------------------
addResource: (
  topicId,
  { title, pdfFiles = [], pdfUrls = [], youtubeLinks = [], summary, tags = [], difficulty }
) => {
  const formData = new FormData();

  formData.append("title", title || "");
  if (summary) formData.append("summary", summary);
  if (difficulty) formData.append("difficulty", difficulty);
  if (tags?.length) formData.append("tags", JSON.stringify(tags));
  if (youtubeLinks?.length) formData.append("youtubeLinks", JSON.stringify(youtubeLinks));

  // PDF uploads
  pdfFiles.forEach((file) => formData.append("pdfs", file));

  // Important: send pdfUrls as JSON array (not objects)
  if (pdfUrls?.length) {
    const cleanUrls = pdfUrls.map((u) =>
      typeof u === "string" ? u.trim() : u.url?.trim()
    ).filter(Boolean);
    formData.append("pdfUrls", JSON.stringify(cleanUrls));
  }

  return request(() =>
    axiosInstance.post(`/api/admin/topics/${topicId}/resources`, formData, {
      headers: { "Content-Type": "multipart/form-data", ...getAuthHeaders() },
    })
  );
},

updateResource: (
  id,
  { title, pdfFiles = [], pdfUrls = [], youtubeLinks = [], summary, tags = [], difficulty, pdfsToKeep }
) => {
  const formData = new FormData();

  formData.append("title", title || "");
  if (summary) formData.append("summary", summary);
  if (difficulty) formData.append("difficulty", difficulty);
  if (tags?.length) formData.append("tags", JSON.stringify(tags));
  if (youtubeLinks?.length) formData.append("youtubeLinks", JSON.stringify(youtubeLinks));
  if (pdfsToKeep) formData.append("pdfsToKeep", JSON.stringify(pdfsToKeep));

  pdfFiles.forEach((file) => formData.append("pdfs", file));

  // send pdfUrls as pure array of strings
  if (pdfUrls?.length) {
    const cleanUrls = pdfUrls.map((u) =>
      typeof u === "string" ? u.trim() : u.url?.trim()
    ).filter(Boolean);
    formData.append("pdfUrls", JSON.stringify(cleanUrls));
  }

  return request(() =>
    axiosInstance.put(`/api/admin/resources/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data", ...getAuthHeaders() },
    })
  );
},


  deleteResource: (id) =>
    request(() => axiosInstance.delete(`/api/admin/resources/${id}`, { headers: getAuthHeaders() })),

  getFirstResourceOfTopic: (topicId) =>
    request(() => axiosInstance.get(`/api/admin/topics/${topicId}/resources/first`, { headers: getAuthHeaders() })),
};
