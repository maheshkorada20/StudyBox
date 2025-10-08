// import React, { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import { adminAPI } from "@/api/admin";
// import { Button } from "@/components/ui/button";

// /**

// * AdminResources.jsx
// *
// * * Cascading selects: Branch -> Year -> Semester -> Subject -> Topic -> Unit (optional)
// * * Add / Edit / Delete resources
// * * Resource fields: title, summary (documentation), multiple PDFs, multiple youtube links (with rank)
// * * Search & filter for resources
// * * UI/UX styled to match AdminBranches (buttons, modal, animations)
// *
// * Note: adminAPI must expose:
// * getBranches(), getYears(branchId), getSemesters(yearId), getSubjects(semesterId),
// * getTopicsBySubject(subjectId), getUnits(subjectId),
// * getResources(), addResource(topicId, formData), updateResource(id, formData), deleteResource(id)
//   */

// const emptyYoutube = () => ({ url: "", rank: 1 });

// const AdminResources = () => {
// // selection state
// const [branches, setBranches] = useState([]);
// const [years, setYears] = useState([]);
// const [semesters, setSemesters] = useState([]);
// const [subjects, setSubjects] = useState([]);
// const [topics, setTopics] = useState([]);
// const [units, setUnits] = useState([]);

// const [selectedBranch, setSelectedBranch] = useState("");
// const [selectedYear, setSelectedYear] = useState("");
// const [selectedSemester, setSelectedSemester] = useState("");
// const [selectedSubject, setSelectedSubject] = useState("");
// const [selectedTopic, setSelectedTopic] = useState("");
// const [selectedUnit, setSelectedUnit] = useState(""); // optional

// // resources & filtering
// const [resources, setResources] = useState([]);
// const [filteredResources, setFilteredResources] = useState([]);
// const [search, setSearch] = useState("");

// // modal / form
// const [modalOpen, setModalOpen] = useState(false);
// const [editingResource, setEditingResource] = useState(null);
// const [title, setTitle] = useState("");
// const [summary, setSummary] = useState("");
// const [pdfFiles, setPdfFiles] = useState([]); // FileList -> Array
// const [youtubeLinks, setYoutubeLinks] = useState([emptyYoutube()]);
// const [loading, setLoading] = useState(false);
// const [msg, setMsg] = useState("");

// // generic loader for select cascading
// useEffect(() => {
// loadBranches();
// loadAllResources();
// }, []);

// // search filter
// useEffect(() => {
// const q = search.trim().toLowerCase();
// if (!q) return setFilteredResources(resources);
// setFilteredResources(
// resources.filter(
// (r) =>
// r.title?.toLowerCase().includes(q) ||
// r.summary?.toLowerCase().includes(q) ||
// (r.topic?.name || "").toLowerCase().includes(q) ||
// (r.subject?.name || "").toLowerCase().includes(q)
// )
// );
// }, [search, resources]);

// // cascade loading helpers
// const loadBranches = async () => {
// try {
// const data = await adminAPI.getBranches();
// setBranches(Array.isArray(data) ? data : []);
// } catch (err) {
// console.error("loadBranches:", err);
// flashMsg("Failed to load branches");
// }
// };

// const loadYears = async (branchId) => {
// setSelectedYear("");
// setSelectedSemester("");
// setSelectedSubject("");
// setSelectedTopic("");
// setSelectedUnit("");
// setYears([]);
// setSemesters([]);
// setSubjects([]);
// setTopics([]);
// setUnits([]);
// if (!branchId) return;
// try {
// const data = await adminAPI.getYears(branchId);
// setYears(Array.isArray(data) ? data : []);
// } catch (err) {
// console.error("loadYears:", err);
// flashMsg("Failed to load years");
// }
// };

// const loadSemesters = async (yearId) => {
// setSelectedSemester("");
// setSelectedSubject("");
// setSelectedTopic("");
// setSelectedUnit("");
// setSemesters([]);
// setSubjects([]);
// setTopics([]);
// setUnits([]);
// if (!yearId) return;
// try {
// const data = await adminAPI.getSemesters(yearId);
// setSemesters(Array.isArray(data) ? data : []);
// } catch (err) {
// console.error("loadSemesters:", err);
// flashMsg("Failed to load semesters");
// }
// };

// const loadSubjects = async (semesterId) => {
// setSelectedSubject("");
// setSelectedTopic("");
// setSelectedUnit("");
// setSubjects([]);
// setTopics([]);
// setUnits([]);
// if (!semesterId) return;
// try {
// const data = await adminAPI.getSubjects(semesterId);
// setSubjects(Array.isArray(data) ? data : []);
// } catch (err) {
// console.error("loadSubjects:", err);
// flashMsg("Failed to load subjects");
// }
// };

// const loadTopics = async (subjectId) => {
// setSelectedTopic("");
// setSelectedUnit("");
// setTopics([]);
// setUnits([]);
// if (!subjectId) return;
// try {
// // Topics directly under subject (unit null) and also unit topics maybe loaded elsewhere
// const data = await adminAPI.getTopicsBySubject(subjectId);
// setTopics(Array.isArray(data) ? data : []);
// // units for this subject
// const unitsData = await adminAPI.getUnits(subjectId);
// setUnits(Array.isArray(unitsData) ? unitsData : []);
// } catch (err) {
// console.error("loadTopics:", err);
// flashMsg("Failed to load topics / units");
// }
// };

// const loadAllResources = async () => {
// try {
// const data = await adminAPI.getResources();
// setResources(Array.isArray(data) ? data : []);
// setFilteredResources(Array.isArray(data) ? data : []);
// } catch (err) {
// console.error("loadAllResources:", err);
// flashMsg("Failed to load resources");
// }
// };

// // helper: flash message
// const flashMsg = (m) => {
// setMsg(m);
// setTimeout(() => setMsg(""), 3500);
// };

// // open add modal
// const openAddModal = () => {
// setEditingResource(null);
// setTitle("");
// setSummary("");
// setPdfFiles([]);
// setYoutubeLinks([emptyYoutube()]);
// setModalOpen(true);
// };

// const openEditModal = (resource) => {
// setEditingResource(resource);
// setTitle(resource.title || "");
// setSummary(resource.summary || "");
// setPdfFiles([]); // we don't remove existing pdfs unless added
// setYoutubeLinks(
// Array.isArray(resource.youtubeLinks) && resource.youtubeLinks.length
// ? resource.youtubeLinks.map((y) => ({ url: y.url || "", rank: y.rank || 1 }))
// : [emptyYoutube()]
// );
// // preselect cascading if resource has branch/subject/topic/unit fields
// if (resource.branch) {
// setSelectedBranch(resource.branch._id || resource.branch);
// // then load years -> semesters -> subjects -> topics -> units sequentially
// loadYears(resource.branch._id || resource.branch).then(() => {
// if (resource.year) {
// setSelectedYear(resource.year._id || resource.year);
// loadSemesters(resource.year._id || resource.year).then(() => {
// if (resource.semester) {
// setSelectedSemester(resource.semester._id || resource.semester);
// loadSubjects(resource.semester._id || resource.semester).then(() => {
// if (resource.subject) {
// setSelectedSubject(resource.subject._id || resource.subject);
// loadTopics(resource.subject._id || resource.subject).then(() => {
// if (resource.topic) setSelectedTopic(resource.topic._id || resource.topic);
// if (resource.unit) setSelectedUnit(resource.unit._id || resource.unit);
// });
// }
// });
// }
// });
// }
// });
// }
// setModalOpen(true);
// };

// // youtube links helpers
// const addYoutube = () => setYoutubeLinks((s) => [...s, emptyYoutube()]);
// const removeYoutube = (idx) => setYoutubeLinks((s) => s.filter((_, i) => i !== idx));
// const updateYoutube = (idx, key, val) =>
// setYoutubeLinks((s) => s.map((y, i) => (i === idx ? { ...y, [key]: val } : y)));

// // builds FormData and sends to backend (create or update)
// const submitResource = async (e) => {
// e.preventDefault();


// if (!selectedTopic) return flashMsg("Please select Topic before adding resource.");
// if (!title.trim()) return flashMsg("Please provide a title.");

// setLoading(true);
// try {
//   const fd = new FormData();
//   fd.append("title", title.trim());
//   fd.append("summary", summary.trim());
//   // youtubeLinks as JSON string
//   fd.append("youtubeLinks", JSON.stringify(youtubeLinks.filter((y) => y.url.trim())));
//   // append files
//   pdfFiles.forEach((f) => fd.append("pdfs", f));
//   // send unit/subject info as raw fields (backend will extract topic -> unit/branch)
//   fd.append("topicId", selectedTopic);
//   if (selectedUnit) fd.append("unitId", selectedUnit);

//   if (editingResource) {
//     await adminAPI.updateResource(editingResource._id, fd);
//     flashMsg("Resource updated successfully");
//   } else {
//     await adminAPI.addResource(selectedTopic, fd);
//     flashMsg("Resource added successfully");
//   }
//   setModalOpen(false);
//   await loadAllResources();
// } catch (err) {
//   console.error("submitResource:", err);
//   flashMsg(err?.response?.data?.message || "Failed to save resource");
// } finally {
//   setLoading(false);
// }


// };

// const handleDeleteResource = async (id) => {
// if (!window.confirm("Delete this resource?")) return;
// try {
// await adminAPI.deleteResource(id);
// flashMsg("Resource deleted");
// loadAllResources();
// } catch (err) {
// console.error("handleDeleteResource:", err);
// flashMsg("Delete failed");
// }
// };

// // filter resources by current selection (if any)
// const applySelectionFilter = () => {
// let list = resources.slice();
// if (selectedBranch) list = list.filter((r) => (r.branch?._id || r.branch) === selectedBranch);
// if (selectedYear) list = list.filter((r) => (r.year?._id || r.year) === selectedYear);
// if (selectedSemester) list = list.filter((r) => (r.semester?._id || r.semester) === selectedSemester);
// if (selectedSubject) list = list.filter((r) => (r.subject?._id || r.subject) === selectedSubject);
// if (selectedTopic) list = list.filter((r) => (r.topic?._id || r.topic) === selectedTopic);
// if (selectedUnit) list = list.filter((r) => (r.unit?._id || r.unit) === selectedUnit);
// setFilteredResources(list);
// };

// // reapply selection filter whenever selection changes or resources change
// useEffect(() => {
// applySelectionFilter();
// // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [selectedBranch, selectedYear, selectedSemester, selectedSubject, selectedTopic, selectedUnit, resources]);

// return ( <main className="container mx-auto px-4 py-8"> <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Resources</h1>

// ```
//   {msg && <div className="mb-4 text-sm text-white bg-indigo-600 px-3 py-2 rounded">{msg}</div>}

//   {/* Cascading selects */}
//   <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
//     <select
//       value={selectedBranch}
//       onChange={(e) => {
//         const id = e.target.value;
//         setSelectedBranch(id);
//         loadYears(id);
//       }}
//       className="border p-2 rounded-md"
//     >
//       <option value="">Select Branch</option>
//       {branches.map((b) => (
//         <option key={b._id} value={b._id}>
//           {b.name}
//         </option>
//       ))}
//     </select>

//     <select
//       value={selectedYear}
//       onChange={(e) => {
//         const id = e.target.value;
//         setSelectedYear(id);
//         loadSemesters(id);
//       }}
//       className="border p-2 rounded-md"
//     >
//       <option value="">Select Year</option>
//       {years.map((y) => (
//         <option key={y._id} value={y._id}>
//           {y.name}
//         </option>
//       ))}
//     </select>

//     <select
//       value={selectedSemester}
//       onChange={(e) => {
//         const id = e.target.value;
//         setSelectedSemester(id);
//         loadSubjects(id);
//       }}
//       className="border p-2 rounded-md"
//     >
//       <option value="">Select Semester</option>
//       {semesters.map((s) => (
//         <option key={s._id} value={s._id}>
//           {s.name}
//         </option>
//       ))}
//     </select>

//     <select
//       value={selectedSubject}
//       onChange={(e) => {
//         const id = e.target.value;
//         setSelectedSubject(id);
//         loadTopics(id);
//       }}
//       className="border p-2 rounded-md"
//     >
//       <option value="">Select Subject</option>
//       {subjects.map((s) => (
//         <option key={s._id} value={s._id}>
//           {s.name}
//         </option>
//       ))}
//     </select>

//     <select
//       value={selectedTopic}
//       onChange={(e) => setSelectedTopic(e.target.value)}
//       className="border p-2 rounded-md"
//     >
//       <option value="">Select Topic</option>
//       {topics.map((t) => (
//         <option key={t._id} value={t._id}>
//           {t.name}
//         </option>
//       ))}
//     </select>

//     <select
//       value={selectedUnit}
//       onChange={(e) => setSelectedUnit(e.target.value)}
//       className="border p-2 rounded-md"
//     >
//       <option value="">Select Unit (optional)</option>
//       {units.map((u) => (
//         <option key={u._id} value={u._id}>
//           {u.name}
//         </option>
//       ))}
//     </select>
//   </div>

//   {/* Search + Add */}
//   <div className="flex items-center justify-between gap-3 mb-4">
//     <input
//       value={search}
//       onChange={(e) => setSearch(e.target.value)}
//       placeholder="Search resources..."
//       className="border p-2 rounded-md w-full max-w-lg focus:ring-2 focus:ring-indigo-400 transition-all"
//     />

//     <Button
//       onClick={openAddModal}
//       className="relative inline-flex items-center justify-center px-5 py-2 font-medium text-white rounded-md shadow-md overflow-hidden transition-all transform hover:scale-105 bg-gradient-to-r from-indigo-500 to-purple-500"
//     >
//       Add Resource
//     </Button>
//   </div>

//   {/* Resources list */}
//   <div className="space-y-3">
//     {filteredResources.length ? (
//       filteredResources.map((r) => (
//         <div
//           key={r._id}
//           className="p-4 bg-white rounded-md shadow-sm hover:shadow-lg transition-shadow flex justify-between items-start"
//         >
//           <div>
//             <div className="flex items-center gap-3">
//               <h3 className="text-lg font-semibold">{r.title}</h3>
//               <span className="text-sm text-gray-500">• {r.topic?.name || "—"}</span>
//               <span className="text-sm text-gray-400">• {r.subject?.name || "—"}</span>
//             </div>
//             <p className="text-sm text-gray-600 mt-2">{r.summary || "No summary"}</p>
//             <div className="mt-2 flex flex-wrap gap-2">
//               {Array.isArray(r.youtubeLinks) &&
//                 r.youtubeLinks.map((y, i) => (
//                   <a key={i} href={y.url} target="_blank" rel="noreferrer" className="text-xs underline text-indigo-600">
//                     Youtube {y.rank ?? i + 1}
//                   </a>
//                 ))}

//               {Array.isArray(r.pdfs) &&
//                 r.pdfs.map((p, i) => (
//                   <a key={i} href={p.url} target="_blank" rel="noreferrer" className="text-xs underline text-green-600">
//                     PDF {i + 1}
//                   </a>
//                 ))}
//             </div>
//             <div className="text-xs text-gray-400 mt-2">Added: {dayjs(r.createdAt).format("DD MMM YYYY")}</div>
//           </div>

//           <div className="flex flex-col items-end gap-2">
//             <div className="flex gap-2">
//               <Button
//                 size="sm"
//                 onClick={() => openEditModal(r)}
//                 className="px-3 py-1 font-medium text-white rounded-md bg-gradient-to-r from-pink-700 to-orange-600 hover:scale-105 transition-transform"
//               >
//                 Edit
//               </Button>
//               <Button
//                 size="sm"
//                 variant="destructive"
//                 onClick={() => handleDeleteResource(r._id)}
//                 className="px-3 py-1 font-medium text-white rounded-md bg-gradient-to-r from-red-500 to-rose-400 hover:scale-105 transition-transform"
//               >
//                 Delete
//               </Button>
//             </div>
//             <div className="text-sm text-gray-500">{r.addedBy?.firstName ? `${r.addedBy.firstName} ${r.addedBy.lastName || ""}` : ""}</div>
//           </div>
//         </div>
//       ))
//     ) : (
//       <p className="text-gray-500">No resources found.</p>
//     )}
//   </div>

//   {/* Modal */}
//   {modalOpen && (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-2xl animate-fadeIn">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-2xl font-semibold">{editingResource ? "Edit Resource" : "Add Resource"}</h2>
//           <div className="text-sm text-gray-500">Topic: {topics.find((t) => t._id === selectedTopic)?.name || "—"}</div>
//         </div>

//         <form onSubmit={submitResource} className="grid grid-cols-1 gap-3">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <input
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Resource Title"
//               className="border p-2 rounded-md w-full"
//               required
//             />
//             <select
//               value={selectedTopic}
//               onChange={(e) => setSelectedTopic(e.target.value)}
//               className="border p-2 rounded-md"
//               required
//             >
//               <option value="">Choose Topic</option>
//               {topics.map((t) => (
//                 <option key={t._id} value={t._id}>
//                   {t.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <textarea
//             value={summary}
//             onChange={(e) => setSummary(e.target.value)}
//             placeholder="Summary / Documentation"
//             className="border p-2 rounded-md w-full min-h-[100px]"
//           />

//           <div>
//             <label className="block text-sm font-medium mb-2">YouTube Links (optional)</label>
//             {youtubeLinks.map((y, idx) => (
//               <div key={idx} className="flex gap-2 items-center mb-2">
//                 <input
//                   value={y.url}
//                   onChange={(e) => updateYoutube(idx, "url", e.target.value)}
//                   placeholder="https://youtube.com/..."
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <input
//                   type="number"
//                   value={y.rank}
//                   onChange={(e) => updateYoutube(idx, "rank", Number(e.target.value))}
//                   min={1}
//                   className="w-20 border p-2 rounded-md"
//                 />
//                 <Button size="sm" onClick={() => removeYoutube(idx)} className="bg-gray-200 text-gray-800">
//                   Remove
//                 </Button>
//               </div>
//             ))}

//             <Button size="sm" onClick={addYoutube} className="mt-2">
//               + Add YouTube Link
//             </Button>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">PDFs (multiple)</label>
//             <input
//               type="file"
//               accept="application/pdf"
//               multiple
//               onChange={(e) => setPdfFiles(Array.from(e.target.files))}
//               className="w-full"
//             />
//             <div className="text-xs text-gray-500 mt-1">Uploaded files will be appended to existing PDFs for an edited resource.</div>
//           </div>

//           <div className="flex justify-end gap-2 mt-3">
//             <Button
//               type="submit"
//               disabled={loading}
//               className="relative inline-flex items-center justify-center px-5 py-2 font-medium text-white rounded-md bg-gradient-to-r from-indigo-500 to-purple-500"
//             >
//               {loading ? "Saving..." : editingResource ? "Update Resource" : "Add Resource"}
//             </Button>
//             <Button
//               type="button"
//               variant="secondary"
//               onClick={() => {
//                 setModalOpen(false);
//                 setEditingResource(null);
//               }}
//               className="px-4 py-2"
//             >
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )}
// // </main>

// // );
// // };

// // export default AdminResources;




// import React, { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import { adminAPI } from "@/api/admin";
// import { Button } from "@/components/ui/button";

// const emptyYoutube = () => ({ url: "", rank: 1 });

// const AdminResources = () => {
//   // selection state
//   const [branches, setBranches] = useState([]);
//   const [years, setYears] = useState([]);
//   const [semesters, setSemesters] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [topics, setTopics] = useState([]);
//   const [units, setUnits] = useState([]);

//   const [selectedBranch, setSelectedBranch] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedSemester, setSelectedSemester] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [selectedTopic, setSelectedTopic] = useState("");
//   const [selectedUnit, setSelectedUnit] = useState(""); // optional

//   // resources & filtering
//   const [resources, setResources] = useState([]);
//   const [filteredResources, setFilteredResources] = useState([]);
//   const [search, setSearch] = useState("");

//   // modal / form
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingResource, setEditingResource] = useState(null);
//   const [title, setTitle] = useState("");
//   const [summary, setSummary] = useState("");
//   const [pdfFiles, setPdfFiles] = useState([]); // new files to add
//   const [existingPDFs, setExistingPDFs] = useState([]); // existing PDFs for edit mode
//   const [youtubeLinks, setYoutubeLinks] = useState([emptyYoutube()]); // new links
//   const [existingYoutubeLinks, setExistingYoutubeLinks] = useState([]); // existing youtube links
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState("");

//   useEffect(() => {
//     loadBranches();
//     loadAllResources();
//   }, []);

//   useEffect(() => {
//     const q = search.trim().toLowerCase();
//     if (!q) return setFilteredResources(resources);
//     setFilteredResources(
//       resources.filter(
//         (r) =>
//           r.title?.toLowerCase().includes(q) ||
//           r.summary?.toLowerCase().includes(q) ||
//           (r.topic?.name || "").toLowerCase().includes(q) ||
//           (r.subject?.name || "").toLowerCase().includes(q)
//       )
//     );
//   }, [search, resources]);

//   const loadBranches = async () => {
//     try {
//       const data = await adminAPI.getBranches();
//       setBranches(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("loadBranches:", err);
//       flashMsg("Failed to load branches");
//     }
//   };

//   const loadYears = async (branchId) => {
//     setSelectedYear("");
//     setSelectedSemester("");
//     setSelectedSubject("");
//     setSelectedTopic("");
//     setSelectedUnit("");
//     setYears([]);
//     setSemesters([]);
//     setSubjects([]);
//     setTopics([]);
//     setUnits([]);
//     if (!branchId) return;
//     try {
//       const data = await adminAPI.getYears(branchId);
//       setYears(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("loadYears:", err);
//       flashMsg("Failed to load years");
//     }
//   };

//   const loadSemesters = async (yearId) => {
//     setSelectedSemester("");
//     setSelectedSubject("");
//     setSelectedTopic("");
//     setSelectedUnit("");
//     setSemesters([]);
//     setSubjects([]);
//     setTopics([]);
//     setUnits([]);
//     if (!yearId) return;
//     try {
//       const data = await adminAPI.getSemesters(yearId);
//       setSemesters(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("loadSemesters:", err);
//       flashMsg("Failed to load semesters");
//     }
//   };

//   const loadSubjects = async (semesterId) => {
//     setSelectedSubject("");
//     setSelectedTopic("");
//     setSelectedUnit("");
//     setSubjects([]);
//     setTopics([]);
//     setUnits([]);
//     if (!semesterId) return;
//     try {
//       const data = await adminAPI.getSubjects(semesterId);
//       setSubjects(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("loadSubjects:", err);
//       flashMsg("Failed to load subjects");
//     }
//   };

//   const loadTopics = async (subjectId) => {
//     setSelectedTopic("");
//     setSelectedUnit("");
//     setTopics([]);
//     setUnits([]);
//     if (!subjectId) return;
//     try {
//       const data = await adminAPI.getTopicsBySubject(subjectId);
//       setTopics(Array.isArray(data) ? data : []);
//       const unitsData = await adminAPI.getUnits(subjectId);
//       setUnits(Array.isArray(unitsData) ? unitsData : []);
//     } catch (err) {
//       console.error("loadTopics:", err);
//       flashMsg("Failed to load topics / units");
//     }
//   };

//   const loadAllResources = async () => {
//     try {
//       const data = await adminAPI.getResources();
//       setResources(Array.isArray(data) ? data : []);
//       setFilteredResources(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("loadAllResources:", err);
//       flashMsg("Failed to load resources");
//     }
//   };

//   const flashMsg = (m) => {
//     setMsg(m);
//     setTimeout(() => setMsg(""), 3500);
//   };

//   const openAddModal = () => {
//     setEditingResource(null);
//     setTitle("");
//     setSummary("");
//     setPdfFiles([]);
//     setExistingPDFs([]);
//     setYoutubeLinks([emptyYoutube()]);
//     setExistingYoutubeLinks([]);
//     setModalOpen(true);
//   };

//   const openEditModal = (resource) => {
//     setEditingResource(resource);
//     setTitle(resource.title || "");
//     setSummary(resource.summary || "");
//     setPdfFiles([]);
//     setExistingPDFs(Array.isArray(resource.pdfs) ? resource.pdfs : []);
//     setYoutubeLinks([emptyYoutube()]);
//     setExistingYoutubeLinks(Array.isArray(resource.youtubeLinks) ? resource.youtubeLinks : []);

//     if (resource.branch) {
//       setSelectedBranch(resource.branch._id || resource.branch);
//       loadYears(resource.branch._id || resource.branch).then(() => {
//         if (resource.year) {
//           setSelectedYear(resource.year._id || resource.year);
//           loadSemesters(resource.year._id || resource.year).then(() => {
//             if (resource.semester) {
//               setSelectedSemester(resource.semester._id || resource.semester);
//               loadSubjects(resource.semester._id || resource.semester).then(() => {
//                 if (resource.subject) {
//                   setSelectedSubject(resource.subject._id || resource.subject);
//                   loadTopics(resource.subject._id || resource.subject).then(() => {
//                     if (resource.topic) setSelectedTopic(resource.topic._id || resource.topic);
//                     if (resource.unit) setSelectedUnit(resource.unit._id || resource.unit);
//                   });
//                 }
//               });
//             }
//           });
//         }
//       });
//     }
//     setModalOpen(true);
//   };

//   const addYoutube = () => setYoutubeLinks((s) => [...s, emptyYoutube()]);
//   const removeYoutube = (idx) => setYoutubeLinks((s) => s.filter((_, i) => i !== idx));
//   const updateYoutube = (idx, key, val) =>
//     setYoutubeLinks((s) => s.map((y, i) => (i === idx ? { ...y, [key]: val } : y)));

//   const removeExistingYoutube = (idx) =>
//     setExistingYoutubeLinks((s) => s.filter((_, i) => i !== idx));
//   const removeExistingPDF = (idx) =>
//     setExistingPDFs((s) => s.filter((_, i) => i !== idx));

//   const submitResource = async (e) => {
//     e.preventDefault();
//     if (!editingResource && !selectedTopic) return flashMsg("Please select Topic before adding resource.");
//     if (!title.trim()) return flashMsg("Please provide a title.");

//     setLoading(true);
//     try {
//       const fd = new FormData();
//       fd.append("title", title.trim());
//       fd.append("summary", summary.trim());
//       fd.append("youtubeLinks", JSON.stringify([...existingYoutubeLinks, ...youtubeLinks.filter((y) => y.url.trim())]));
//       pdfFiles.forEach((f) => fd.append("pdfs", f));
//       if (editingResource) {
//         fd.append("existingPDFs", JSON.stringify(existingPDFs.map((p) => p._id)));
//         await adminAPI.updateResource(editingResource._id, fd);
//         flashMsg("Resource updated successfully");
//       } else {
//         fd.append("topicId", selectedTopic);
//         if (selectedUnit) fd.append("unitId", selectedUnit);
//         await adminAPI.addResource(selectedTopic, fd);
//         flashMsg("Resource added successfully");
//       }
//       setModalOpen(false);
//       await loadAllResources();
//     } catch (err) {
//       console.error("submitResource:", err);
//       flashMsg(err?.response?.data?.message || "Failed to save resource");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteResource = async (id) => {
//     if (!window.confirm("Delete this resource?")) return;
//     try {
//       await adminAPI.deleteResource(id);
//       flashMsg("Resource deleted");
//       loadAllResources();
//     } catch (err) {
//       console.error("handleDeleteResource:", err);
//       flashMsg("Delete failed");
//     }
//   };

//   const applySelectionFilter = () => {
//     let list = resources.slice();
//     if (selectedBranch) list = list.filter((r) => (r.branch?._id || r.branch) === selectedBranch);
//     if (selectedYear) list = list.filter((r) => (r.year?._id || r.year) === selectedYear);
//     if (selectedSemester) list = list.filter((r) => (r.semester?._id || r.semester) === selectedSemester);
//     if (selectedSubject) list = list.filter((r) => (r.subject?._id || r.subject) === selectedSubject);
//     if (selectedTopic) list = list.filter((r) => (r.topic?._id || r.topic) === selectedTopic);
//     if (selectedUnit) list = list.filter((r) => (r.unit?._id || r.unit) === selectedUnit);
//     setFilteredResources(list);
//   };

//   useEffect(() => {
//     applySelectionFilter();
//   }, [selectedBranch, selectedYear, selectedSemester, selectedSubject, selectedTopic, selectedUnit, resources]);

//   return (
//     <main className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Resources</h1>

//       {msg && <div className="mb-4 text-sm text-white bg-indigo-600 px-3 py-2 rounded">{msg}</div>}

//       {/* Cascading selects */}
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
//         <select
//           value={selectedBranch}
//           onChange={(e) => {
//             const id = e.target.value;
//             setSelectedBranch(id);
//             loadYears(id);
//           }}
//           className="border p-2 rounded-md"
//         >
//           <option value="">Select Branch</option>
//           {branches.map((b) => (
//             <option key={b._id} value={b._id}>
//               {b.name}
//             </option>
//           ))}
//         </select>

//         <select
//           value={selectedYear}
//           onChange={(e) => {
//             const id = e.target.value;
//             setSelectedYear(id);
//             loadSemesters(id);
//           }}
//           className="border p-2 rounded-md"
//         >
//           <option value="">Select Year</option>
//           {years.map((y) => (
//             <option key={y._id} value={y._id}>
//               {y.name}
//             </option>
//           ))}
//         </select>

//         <select
//           value={selectedSemester}
//           onChange={(e) => {
//             const id = e.target.value;
//             setSelectedSemester(id);
//             loadSubjects(id);
//           }}
//           className="border p-2 rounded-md"
//         >
//           <option value="">Select Semester</option>
//           {semesters.map((s) => (
//             <option key={s._id} value={s._id}>
//               {s.name}
//             </option>
//           ))}
//         </select>

//         <select
//           value={selectedSubject}
//           onChange={(e) => {
//             const id = e.target.value;
//             setSelectedSubject(id);
//             loadTopics(id);
//           }}
//           className="border p-2 rounded-md"
//         >
//           <option value="">Select Subject</option>
//           {subjects.map((s) => (
//             <option key={s._id} value={s._id}>
//               {s.name}
//             </option>
//           ))}
//         </select>

//         <select
//           value={selectedTopic}
//           onChange={(e) => setSelectedTopic(e.target.value)}
//           className="border p-2 rounded-md"
//         >
//           <option value="">Select Topic</option>
//           {topics.map((t) => (
//             <option key={t._id} value={t._id}>
//               {t.name}
//             </option>
//           ))}
//         </select>

//         <select
//           value={selectedUnit}
//           onChange={(e) => setSelectedUnit(e.target.value)}
//           className="border p-2 rounded-md"
//         >
//           <option value="">Select Unit (optional)</option>
//           {units.map((u) => (
//             <option key={u._id} value={u._id}>
//               {u.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Search + Add */}
//       <div className="flex items-center justify-between gap-3 mb-4">
//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search resources..."
//           className="border p-2 rounded-md w-full max-w-lg focus:ring-2 focus:ring-indigo-400 transition-all"
//         />

//         <Button
//           onClick={openAddModal}
//           className="relative inline-flex items-center justify-center px-5 py-2 font-medium text-white rounded-md shadow-md overflow-hidden transition-all transform hover:scale-105 bg-gradient-to-r from-indigo-500 to-purple-500"
//         >
//           Add Resource
//         </Button>
//       </div>

//       {/* Resources list */}
//       <div className="space-y-3">
//         {filteredResources.length ? (
//           filteredResources.map((r) => (
//             <div
//               key={r._id}
//               className="p-4 bg-white rounded-md shadow-sm hover:shadow-lg transition-shadow flex justify-between items-start"
//             >
//               <div>
//                 <div className="flex items-center gap-3">
//                   <h3 className="text-lg font-semibold">{r.title}</h3>
//                   <span className="text-sm text-gray-500">• {r.topic?.name || "—"}</span>
//                   <span className="text-sm text-gray-400">• {r.subject?.name || "—"}</span>
//                 </div>
//                 <p className="text-sm text-gray-600 mt-2">{r.summary || "No summary"}</p>
//                 <div className="mt-2 flex flex-wrap gap-2">
//                   {Array.isArray(r.youtubeLinks) &&
//                     r.youtubeLinks.map((y, i) => (
//                       <a key={i} href={y.url} target="_blank" rel="noreferrer" className="text-xs underline text-indigo-600">
//                         Youtube {y.rank ?? i + 1}
//                       </a>
//                     ))}

//                   {Array.isArray(r.pdfs) &&
//                     r.pdfs.map((p, i) => (
//                       <a key={i} href={p.url} target="_blank" rel="noreferrer" className="text-xs underline text-green-600">
//                         PDF {i + 1}
//                       </a>
//                     ))}
//                 </div>
//                 <div className="text-xs text-gray-400 mt-2">Added: {dayjs(r.createdAt).format("DD MMM YYYY")}</div>
//               </div>

//               <div className="flex flex-col items-end gap-2">
//                 <div className="flex gap-2">
//                   <Button
//                     size="sm"
//                     onClick={() => openEditModal(r)}
//                     className="px-3 py-1 font-medium text-white rounded-md bg-gradient-to-r from-pink-700 to-orange-600 hover:scale-105 transition-transform"
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="destructive"
//                     onClick={() => handleDeleteResource(r._id)}
//                     className="px-3 py-1 font-medium text-white rounded-md bg-gradient-to-r from-red-500 to-rose-400 hover:scale-105 transition-transform"
//                   >
//                     Delete
//                   </Button>
//                 </div>
//                 <div className="text-sm text-gray-500">{r.addedBy?.firstName ? `${r.addedBy.firstName} ${r.addedBy.lastName || ""}` : ""}</div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No resources found.</p>
//         )}
//       </div>

//       {/* Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-2xl animate-fadeIn">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-2xl font-semibold">{editingResource ? "Edit Resource" : "Add Resource"}</h2>
//               {editingResource && <div className="text-sm text-gray-500">Topic: {topics.find((t) => t._id === selectedTopic)?.name || "—"}</div>}
//             </div>

//             <form onSubmit={submitResource} className="grid grid-cols-1 gap-3">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 <input
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   placeholder="Resource Title"
//                   className="border p-2 rounded-md w-full"
//                   required
//                 />
//                 {/* Show topic select only in Add mode */}
//                 {!editingResource && (
//                   <select
//                     value={selectedTopic}
//                     onChange={(e) => setSelectedTopic(e.target.value)}
//                     className="border p-2 rounded-md"
//                     required
//                   >
//                     <option value="">Choose Topic</option>
//                     {topics.map((t) => (
//                       <option key={t._id} value={t._id}>
//                         {t.name}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//               </div>

//               <textarea
//                 value={summary}
//                 onChange={(e) => setSummary(e.target.value)}
//                 placeholder="Summary / Documentation"
//                 className="border p-2 rounded-md w-full min-h-[100px]"
//               />

//               {/* Existing YouTube links */}
//               {editingResource && existingYoutubeLinks.length > 0 && (
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Existing YouTube Links</label>
//                   {existingYoutubeLinks.map((y, idx) => (
//                     <div key={idx} className="flex gap-2 items-center mb-2">
//                       <a href={y.url} target="_blank" rel="noreferrer" className="underline text-indigo-600 w-full">
//                         {y.url} (Rank: {y.rank})
//                       </a>
//                       <Button size="sm" onClick={() => removeExistingYoutube(idx)} className="bg-gray-200 text-gray-800">
//                         Remove
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* New YouTube links */}
//               <div>
//                 <label className="block text-sm font-medium mb-2">YouTube Links (optional)</label>
//                 {youtubeLinks.map((y, idx) => (
//                   <div key={idx} className="flex gap-2 items-center mb-2">
//                     <input
//                       value={y.url}
//                       onChange={(e) => updateYoutube(idx, "url", e.target.value)}
//                       placeholder="https://youtube.com/..."
//                       className="border p-2 rounded-md w-full"
//                     />
//                     <input
//                       type="number"
//                       value={y.rank}
//                       onChange={(e) => updateYoutube(idx, "rank", Number(e.target.value))}
//                       min={1}
//                       className="w-20 border p-2 rounded-md"
//                     />
//                     <Button size="sm" onClick={() => removeYoutube(idx)} className="bg-gray-200 text-gray-800">
//                       Remove
//                     </Button>
//                   </div>
//                 ))}
//                 <Button size="sm" onClick={addYoutube} className="mt-2">
//                   + Add YouTube Link
//                 </Button>
//               </div>

//               {/* Existing PDFs */}
//               {editingResource && existingPDFs.length > 0 && (
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Existing PDFs</label>
//                   {existingPDFs.map((p, idx) => (
//                     <div key={idx} className="flex gap-2 items-center mb-2">
//                       <a href={p.url} target="_blank" rel="noreferrer" className="underline text-green-600 w-full">
//                         {p.name || `PDF ${idx + 1}`}
//                       </a>
//                       <Button size="sm" onClick={() => removeExistingPDF(idx)} className="bg-gray-200 text-gray-800">
//                         Remove
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Add new PDFs */}
//               <div>
//                 <label className="block text-sm font-medium mb-2">PDFs (multiple)</label>
//                 <input
//                   type="file"
//                   accept="application/pdf"
//                   multiple
//                   onChange={(e) => setPdfFiles(Array.from(e.target.files))}
//                   className="w-full"
//                 />
//                 <div className="text-xs text-gray-500 mt-1">
//                   {editingResource ? "Uploaded files will be appended to existing PDFs." : "Upload multiple PDFs."}
//                 </div>
//               </div>

//               <div className="flex justify-end gap-2 mt-3">
//                 <Button
//                   type="submit"
//                   disabled={loading}
//                   className="relative inline-flex items-center justify-center px-5 py-2 font-medium text-white rounded-md bg-gradient-to-r from-indigo-500 to-purple-500"
//                 >
//                   {loading ? "Saving..." : editingResource ? "Update Resource" : "Add Resource"}
//                 </Button>
//                 <Button
//                   type="button"
//                   variant="secondary"
//                   onClick={() => {
//                     setModalOpen(false);
//                     setEditingResource(null);
//                   }}
//                   className="px-4 py-2"
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };

// export default AdminResources;
// import React, { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import { adminAPI } from "@/api/admin";
// import { Button } from "@/components/ui/button";
// import { Tab } from "@headlessui/react";
// import { motion, AnimatePresence } from "framer-motion";

// const emptyYoutube = () => ({ url: "", rank: 1 });

// const AdminResources = () => {
//   // ================= STATE =================
//   const [branches, setBranches] = useState([]);
//   const [years, setYears] = useState([]);
//   const [semesters, setSemesters] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [topics, setTopics] = useState([]);
//   const [units, setUnits] = useState([]);

//   const [selectedBranch, setSelectedBranch] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedSemester, setSelectedSemester] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [selectedTopic, setSelectedTopic] = useState("");
//   const [selectedUnit, setSelectedUnit] = useState("");

//   const [resources, setResources] = useState([]);
//   const [filteredResources, setFilteredResources] = useState([]);
//   const [search, setSearch] = useState("");

//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingResource, setEditingResource] = useState(null);
//   const [title, setTitle] = useState("");
//   const [summary, setSummary] = useState("");
//   const [pdfFiles, setPdfFiles] = useState([]);
//   const [existingPDFs, setExistingPDFs] = useState([]);
//   const [pdfUrlInput, setPdfUrlInput] = useState("");
//   const [youtubeLinks, setYoutubeLinks] = useState([emptyYoutube()]);
//   const [existingYoutubeLinks, setExistingYoutubeLinks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState("");

//   // ================= EFFECTS =================
//   useEffect(() => {
//     loadBranches();
//     loadAllResources();
//   }, []);

//   useEffect(() => {
//     const q = search.trim().toLowerCase();
//     if (!q) return setFilteredResources(resources);
//     setFilteredResources(
//       resources.filter(
//         (r) =>
//           r.title?.toLowerCase().includes(q) ||
//           r.summary?.toLowerCase().includes(q) ||
//           (r.topic?.name || "").toLowerCase().includes(q) ||
//           (r.subject?.name || "").toLowerCase().includes(q)
//       )
//     );
//   }, [search, resources]);

//   const flashMsg = (m) => {
//     setMsg(m);
//     setTimeout(() => setMsg(""), 3500);
//   };

//   // ================= LOADERS =================
//   const loadBranches = async () => {
//     try {
//       const data = await adminAPI.getBranches();
//       setBranches(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("loadBranches:", err);
//       flashMsg("Failed to load branches");
//     }
//   };
//   const loadYears = async (branchId) => {
//     setSelectedYear(""); setSelectedSemester(""); setSelectedSubject(""); setSelectedTopic(""); setSelectedUnit("");
//     setYears([]); setSemesters([]); setSubjects([]); setTopics([]); setUnits([]);
//     if (!branchId) return;
//     try {
//       const data = await adminAPI.getYears(branchId);
//       setYears(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("loadYears:", err);
//       flashMsg("Failed to load years");
//     }
//   };
//   const loadSemesters = async (yearId) => {
//     setSelectedSemester(""); setSelectedSubject(""); setSelectedTopic(""); setSelectedUnit("");
//     setSemesters([]); setSubjects([]); setTopics([]); setUnits([]);
//     if (!yearId) return;
//     try {
//       const data = await adminAPI.getSemesters(yearId);
//       setSemesters(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("loadSemesters:", err);
//       flashMsg("Failed to load semesters");
//     }
//   };
//   const loadSubjects = async (semesterId) => {
//     setSelectedSubject(""); setSelectedTopic(""); setSelectedUnit("");
//     setSubjects([]); setTopics([]); setUnits([]);
//     if (!semesterId) return;
//     try {
//       const data = await adminAPI.getSubjects(semesterId);
//       setSubjects(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("loadSubjects:", err);
//       flashMsg("Failed to load subjects");
//     }
//   };
//   const loadTopics = async (subjectId) => {
//     setSelectedTopic(""); setSelectedUnit("");
//     setTopics([]); setUnits([]);
//     if (!subjectId) return;
//     try {
//       const data = await adminAPI.getTopicsBySubject(subjectId);
//       setTopics(Array.isArray(data) ? data : []);
//       const unitsData = await adminAPI.getUnits(subjectId);
//       setUnits(Array.isArray(unitsData) ? unitsData : []);
//     } catch (err) {
//       console.error("loadTopics:", err);
//       flashMsg("Failed to load topics / units");
//     }
//   };
//   const loadAllResources = async () => {
//     try {
//       const data = await adminAPI.getResources();
//       setResources(Array.isArray(data) ? data : []);
//       setFilteredResources(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("loadAllResources:", err);
//       flashMsg("Failed to load resources");
//     }
//   };

//   // ================= MODAL =================
//   const openAddModal = () => {
//     setEditingResource(null);
//     setTitle(""); setSummary(""); setPdfFiles([]); setExistingPDFs([]);
//     setYoutubeLinks([emptyYoutube()]); setExistingYoutubeLinks([]);
//     setModalOpen(true);
//   };
//   const openEditModal = (resource) => {
//     setEditingResource(resource);
//     setTitle(resource.title || ""); setSummary(resource.summary || "");
//     setPdfFiles([]); setExistingPDFs(Array.isArray(resource.pdfs) ? resource.pdfs : []);
//     setYoutubeLinks([emptyYoutube()]); setExistingYoutubeLinks(Array.isArray(resource.youtubeLinks) ? resource.youtubeLinks : []);

//     if (resource.branch) {
//       setSelectedBranch(resource.branch._id || resource.branch);
//       loadYears(resource.branch._id || resource.branch).then(() => {
//         if (resource.year) {
//           setSelectedYear(resource.year._id || resource.year);
//           loadSemesters(resource.year._id || resource.year).then(() => {
//             if (resource.semester) {
//               setSelectedSemester(resource.semester._id || resource.semester);
//               loadSubjects(resource.semester._id || resource.semester).then(() => {
//                 if (resource.subject) {
//                   setSelectedSubject(resource.subject._id || resource.subject);
//                   loadTopics(resource.subject._id || resource.subject).then(() => {
//                     if (resource.topic) setSelectedTopic(resource.topic._id || resource.topic);
//                     if (resource.unit) setSelectedUnit(resource.unit._id || resource.unit);
//                   });
//                 }
//               });
//             }
//           });
//         }
//       });
//     }
//     setModalOpen(true);
//   };

//   const addYoutube = () => setYoutubeLinks((s) => [...s, emptyYoutube()]);
//   const removeYoutube = (idx) => setYoutubeLinks((s) => s.filter((_, i) => i !== idx));
//   const updateYoutube = (idx, key, val) =>
//     setYoutubeLinks((s) => s.map((y, i) => (i === idx ? { ...y, [key]: val } : y)));
//   const removeExistingYoutube = (idx) =>
//     setExistingYoutubeLinks((s) => s.filter((_, i) => i !== idx));
//   const removeExistingPDF = (idx) =>
//     setExistingPDFs((s) => s.filter((_, i) => i !== idx));
  

// const submitResource = async (e) => {
//   e.preventDefault();
//   if (!editingResource && !selectedTopic)
//     return flashMsg("Please select Topic before adding resource.");
//   if (!title.trim()) return flashMsg("Please provide a title.");

//   setLoading(true);

//   try {
//     // Prepare YouTube links
//     const allYoutubeLinks = [
//       ...existingYoutubeLinks,
//       ...youtubeLinks.filter((y) => y.url.trim())
//     ];

//     // Prepare PDF URLs
//     const pdfUrls = existingPDFs
//       .filter((p) => p.fileType === "url" || (!p.fileType && p.url))
//       .map((p) => ({ url: p.url, filename: p.filename || p.url.split("/").pop() }));

//     // Prepare existing PDFs to keep
//     const pdfsToKeep = existingPDFs
//       .filter((p) => p.fileType !== "url")
//       .map((p) => ({ url: p.url, filename: p.filename || p.name }));

//     if (editingResource) {
//       // Update resource
//       await adminAPI.updateResource(editingResource._id, {
//         title,
//         summary,
//         difficulty: editingResource?.difficulty || "easy",
//         tags: editingResource?.tags || [],
//         youtubeLinks: allYoutubeLinks,
//         pdfFiles,       // files to upload
//         pdfUrls,        // URLs to add
//         pdfsToKeep,     // existing PDFs to keep
//       });
//       flashMsg("Resource updated successfully");
//     } else {
//       // Add new resource
//       await adminAPI.addResource(selectedTopic, {
//         title,
//         summary,
//         difficulty: "easy",
//         tags: [],
//         youtubeLinks: youtubeLinks.filter((y) => y.url.trim()),
//         pdfFiles,
//         pdfUrls,
//       });
//       flashMsg("Resource added successfully");
//     }

//     setModalOpen(false);
//     await loadAllResources();
//   } catch (err) {
//     console.error("submitResource:", err);
//     flashMsg(err?.response?.data?.message || "Failed to save resource");
//   } finally {
//     setLoading(false);
//   }
// };


//   const handleDeleteResource = async (id) => {
//     if (!window.confirm("Delete this resource?")) return;
//     try {
//       await adminAPI.deleteResource(id);
//       flashMsg("Resource deleted");
//       loadAllResources();
//     } catch (err) {
//       console.error("handleDeleteResource:", err);
//       flashMsg("Delete failed");
//     }
//   };

//   const applySelectionFilter = () => {
//     let list = resources.slice();
//     if (selectedBranch) list = list.filter((r) => (r.branch?._id || r.branch) === selectedBranch);
//     if (selectedYear) list = list.filter((r) => (r.year?._id || r.year) === selectedYear);
//     if (selectedSemester) list = list.filter((r) => (r.semester?._id || r.semester) === selectedSemester);
//     if (selectedSubject) list = list.filter((r) => (r.subject?._id || r.subject) === selectedSubject);
//     if (selectedTopic) list = list.filter((r) => (r.topic?._id || r.topic) === selectedTopic);
//     if (selectedUnit) list = list.filter((r) => (r.unit?._id || r.unit) === selectedUnit);
//     setFilteredResources(list);
//   };
//   useEffect(() => {
//     applySelectionFilter();
//   }, [selectedBranch, selectedYear, selectedSemester, selectedSubject, selectedTopic, selectedUnit, resources]);

//   // ================= RETURN UI ================= ================= NEW UI =================
//   return (
//     <main className="container mx-auto px-4 py-8">
//       {/* TITLE */}
//       <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-800 dark:text-gray-100 tracking-tight">Manage Resources</h1>

//       {/* FLASH MESSAGE */}
//       <AnimatePresence>
//         {msg && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="mb-4 text-sm text-white bg-indigo-600 px-4 py-2 rounded shadow-lg"
//           >
//             {msg}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* FILTERS */}
//       <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-6">
//         {[{value: selectedBranch, set: setSelectedBranch, load: loadYears, label: "Branch", data: branches},
//           {value: selectedYear, set: setSelectedYear, load: loadSemesters, label: "Year", data: years},
//           {value: selectedSemester, set: setSelectedSemester, load: loadSubjects, label: "Semester", data: semesters},
//           {value: selectedSubject, set: setSelectedSubject, load: loadTopics, label: "Subject", data: subjects},
//           {value: selectedTopic, set: setSelectedTopic, label: "Topic", data: topics},
//           {value: selectedUnit, set: setSelectedUnit, label: "Unit (optional)", data: units}
//         ].map((f, idx) => (
//           <select
//             key={idx}
//             value={f.value}
//             onChange={(e) => {f.set(e.target.value); f.load && f.load(e.target.value)}}
//             className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-gray-100 hover:shadow-md transition duration-200"
//           >
//             <option value="">{f.label}</option>
//             {f.data.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
//           </select>
//         ))}
//       </div>

//       {/* SEARCH + ADD */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-6">
//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search resources..."
//           className="border p-3 rounded-lg w-full max-w-lg shadow-sm focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-gray-100 transition duration-200"
//         />
//         <Button
//           onClick={openAddModal}
//           className="px-6 py-3 mt-2 md:mt-0 font-semibold text-white rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
//         >
//           + Add Resource
//         </Button>
//       </div>

//       {/* RESOURCE CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {filteredResources.length ? filteredResources.map((r) => (
//           <motion.div
//             key={r._id}
//             whileHover={{ scale: 1.03 }}
//             transition={{ duration: 0.2 }}
//             className="p-5 rounded-2xl shadow-lg backdrop-blur-md bg-white/70 dark:bg-gray-800/70 hover:shadow-2xl transition duration-300 flex flex-col justify-between"
//           >
//             <div>
//               <div className="flex flex-wrap items-center gap-2 mb-2">
//                 <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{r.title}</h3>
//                 <span className="text-sm text-gray-500 dark:text-gray-400">• {r.topic?.name || "—"}</span>
//                 <span className="text-sm text-gray-400 dark:text-gray-500">• {r.subject?.name || "—"}</span>
//               </div>
//               <p className="text-sm text-gray-600 dark:text-gray-300">{r.summary || "No summary"}</p>

//               {/* Links */}
//               <div className="mt-3 flex flex-wrap gap-2">
//                 {Array.isArray(r.youtubeLinks) && r.youtubeLinks.map((y, i) => (
//                   <a
//                     key={i}
//                     href={y.url}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="text-xs px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-100 font-medium hover:scale-105 transition-transform"
//                   >
//                     Youtube {y.rank ?? i+1}
//                   </a>
//                 ))}
//                 {Array.isArray(r.pdfs) && r.pdfs.map((p, i) => (
//                   <a
//                     key={i}
//                     href={p.url}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 font-medium hover:scale-105 transition-transform"
//                   >
//                     PDF {i+1}
//                   </a>
//                 ))}
//               </div>

//               <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">Added: {dayjs(r.createdAt).format("DD MMM YYYY")}</div>
//             </div>

//             {/* ACTIONS */}
//             <div className="mt-4 flex justify-between items-center">
//               <div className="flex gap-3">
//                 <Button size="sm" onClick={() => openEditModal(r)} className="px-4 py-1 text-white bg-gradient-to-r from-pink-600 to-orange-500 hover:scale-105 transition-transform">Edit</Button>
//                 <Button size="sm" variant="destructive" onClick={() => handleDeleteResource(r._id)} className="px-4 py-1 text-white bg-gradient-to-r from-red-500 to-rose-400 hover:scale-105 transition-transform">Delete</Button>
//               </div>
//               <div className="text-sm text-gray-500 dark:text-gray-400">{r.addedBy?.firstName ? `${r.addedBy.firstName} ${r.addedBy.lastName || ""}` : ""}</div>
//             </div>
//           </motion.div>
//         )) : <p className="text-gray-500 dark:text-gray-400">No resources found.</p>}
//       </div>

//       {/* MODAL */}
//       <AnimatePresence>
//         {modalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           >
//             <motion.div
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: 50, opacity: 0 }}
//               className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-3xl p-6 shadow-2xl overflow-y-auto max-h-[90vh] animate-fadeIn"
//             >
//               {/* MODAL HEADER */}
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{editingResource ? "Edit Resource" : "Add Resource"}</h2>
//                 {editingResource && <div className="text-sm text-gray-500 dark:text-gray-400">Topic: {topics.find((t) => t._id === selectedTopic)?.name || "—"}</div>}
//               </div>

//               {/* TABS */}
//               <Tab.Group>
//                 <Tab.List className="flex space-x-1 bg-gray-200 dark:bg-gray-700 p-1 rounded-lg">
//                   {["General", "YouTube Links", "PDFs"].map((tab) => (
//                     <Tab
//                       key={tab}
//                       className={({ selected }) =>
//                         `px-4 py-2 font-medium rounded-md transition ${
//                           selected ? "bg-white dark:bg-gray-800 shadow" : "text-gray-500 dark:text-gray-300"
//                         }`
//                       }
//                     >
//                       {tab}
//                     </Tab>
//                   ))}
//                 </Tab.List>

//                 <Tab.Panels className="mt-4">
//                   {/* GENERAL */}
//                   <Tab.Panel>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <input
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         placeholder="Resource Title"
//                         className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-gray-100 transition duration-200"
//                         required
//                       />
//                       {!editingResource && (
//                         <select
//                           value={selectedTopic}
//                           onChange={(e) => setSelectedTopic(e.target.value)}
//                           className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-gray-100 transition duration-200"
//                           required
//                         >
//                           <option value="">Choose Topic</option>
//                           {topics.map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
//                         </select>
//                       )}
//                     </div>
//                     <textarea
//                       value={summary}
//                       onChange={(e) => setSummary(e.target.value)}
//                       placeholder="Summary / Documentation"
//                       className="border p-3 rounded-lg shadow-sm w-full mt-4 dark:bg-gray-700 dark:text-gray-100 transition duration-200 min-h-[120px]"
//                     />
//                   </Tab.Panel>

//                   {/* YOUTUBE */}
//                   <Tab.Panel>
//                     {editingResource && existingYoutubeLinks.length > 0 && (
//                       <div className="mb-4">
//                         <label className="block font-medium mb-2 text-gray-700 dark:text-gray-200">Existing YouTube Links</label>
//                         {existingYoutubeLinks.map((y, idx) => (
//                           <div key={idx} className="flex gap-2 items-center mb-2">
//                             <a href={y.url} target="_blank" rel="noreferrer" className="underline text-indigo-600 dark:text-indigo-300 w-full">{y.url} (Rank: {y.rank})</a>
//                             <Button size="sm" onClick={() => removeExistingYoutube(idx)} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200">Remove</Button>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                     <div>
//                       <label className="block font-medium mb-2 text-gray-700 dark:text-gray-200">New YouTube Links</label>
//                       {youtubeLinks.map((y, idx) => (
//                         <div key={idx} className="flex gap-2 items-center mb-2">
//                           <input value={y.url} onChange={(e) => updateYoutube(idx, "url", e.target.value)} placeholder="https://youtube.com/..." className="border p-2 rounded-lg w-full dark:bg-gray-700 dark:text-gray-100"/>
//                           <input type="number" value={y.rank} onChange={(e) => updateYoutube(idx, "rank", Number(e.target.value))} min={1} className="w-20 border p-2 rounded-lg dark:bg-gray-700 dark:text-gray-100"/>
//                           <Button size="sm" onClick={() => removeYoutube(idx)} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200">Remove</Button>
//                         </div>
//                       ))}
//                       <Button size="sm" onClick={addYoutube} className="mt-2 px-4 py-1">+ Add YouTube Link</Button>
//                     </div>
//                   </Tab.Panel>

//                   {/* PDF */}
//                   <Tab.Panel>
//                     {/* Existing PDFs */}
//                     {editingResource && existingPDFs.length > 0 && (
//                       <div className="mb-4">
//                         <label className="block font-medium mb-2 text-gray-700 dark:text-gray-200">Existing PDFs</label>
//                         {existingPDFs.map((p, idx) => (
//                           <div key={idx} className="flex gap-2 items-center mb-2">
//                             <a
//                               href={p.url}
//                               target="_blank"
//                               rel="noreferrer"
//                               className="underline text-green-600 dark:text-green-300 w-full"
//                             >
//                               {p.filename || p.name || `PDF ${idx + 1}`}
//                             </a>
//                             <Button
//                               size="sm"
//                               onClick={() => removeExistingPDF(idx)}
//                               className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
//                             >
//                               Remove
//                             </Button>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {/* Upload new PDFs */}
//                     <div>
//                       <label className="block font-medium mb-2 text-gray-700 dark:text-gray-200">Upload PDFs</label>
//                       {pdfFiles.map((file, idx) => (
//                         <div key={idx} className="flex gap-2 items-center mb-2">
//                           <input
//                             type="file"
//                             accept="application/pdf"
//                             onChange={(e) => {
//                               const newFiles = [...pdfFiles];
//                               newFiles[idx] = e.target.files[0];
//                               setPdfFiles(newFiles);
//                             }}
//                             className="border p-2 rounded-lg w-full dark:bg-gray-700 dark:text-gray-100"
//                           />
//                           <Button
//                             size="sm"
//                             onClick={() => setPdfFiles(pdfFiles.filter((_, i) => i !== idx))}
//                             className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
//                           >
//                             Remove
//                           </Button>
//                         </div>
//                       ))}
//                       <Button
//                         size="sm"
//                         onClick={() => setPdfFiles([...pdfFiles, null])}
//                         className="mt-2 px-4 py-1"
//                       >
//                         + Add PDF
//                       </Button>

//                       {/* Input for new PDF URLs */}
//                       <div className="mt-2">
//                         <label className="block font-medium mb-2 text-gray-700 dark:text-gray-200">Add PDF URLs</label>
//                         <input
//                           type="text"
//                           placeholder="https://example.com/file.pdf"
//                           value={pdfUrlInput || ""}
//                           onChange={(e) => setPdfUrlInput(e.target.value)}
//                           className="border p-2 rounded-lg w-full dark:bg-gray-700 dark:text-gray-100 mb-2"
//                         />
//                         <Button
//                           size="sm"
//                           onClick={() => {
//                             if (pdfUrlInput?.trim()) {
//                               setExistingPDFs([...existingPDFs, { url: pdfUrlInput.trim(), filename: pdfUrlInput.split("/").pop() }]);
//                               setPdfUrlInput("");
//                             }
//                           }}
//                           className="px-4 py-1"
//                         >
//                           + Add PDF URL
//                         </Button>
//                       </div>
//                     </div>
//                   </Tab.Panel>
//                 </Tab.Panels>
//               </Tab.Group>

//               {/* MODAL ACTIONS */}
//               <div className="flex justify-end gap-3 mt-6">
//                 <Button type="submit" onClick={submitResource} disabled={loading} className="px-6 py-2 text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md hover:scale-105 transition-transform">
//                   {loading ? "Saving..." : editingResource ? "Update Resource" : "Add Resource"}
//                 </Button>
//                 <Button type="button" variant="secondary" onClick={() => {setModalOpen(false); setEditingResource(null)}} className="px-5 py-2">Cancel</Button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </main>
//   );
// };

// export default AdminResources;


import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { adminAPI } from "@/api/admin";
import { Button } from "@/components/ui/button";
import { Tab } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

const emptyYoutube = () => ({ url: "", rank: 1 });

const AdminResources = () => {
  // ================= STATE =================
  const [branches, setBranches] = useState([]);
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [units, setUnits] = useState([]);

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");

  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [pdfFiles, setPdfFiles] = useState([]);
  const [existingPDFs, setExistingPDFs] = useState([]);
  const [pdfUrlInput, setPdfUrlInput] = useState("");
  const [youtubeLinks, setYoutubeLinks] = useState([emptyYoutube()]);
  const [existingYoutubeLinks, setExistingYoutubeLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // ================= EFFECTS =================
  useEffect(() => {
    loadBranches();
    loadAllResources();
  }, []);

  useEffect(() => {
    const q = search.trim().toLowerCase();
    if (!q) return setFilteredResources(resources);
    setFilteredResources(
      resources.filter(
        (r) =>
          r.title?.toLowerCase().includes(q) ||
          r.summary?.toLowerCase().includes(q) ||
          (r.topic?.name || "").toLowerCase().includes(q) ||
          (r.subject?.name || "").toLowerCase().includes(q)
      )
    );
  }, [search, resources]);

  const flashMsg = (m) => {
    setMsg(m);
    setTimeout(() => setMsg(""), 3500);
  };

  // ================= LOADERS =================
  const loadBranches = async () => {
    try {
      const data = await adminAPI.getBranches();
      setBranches(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("loadBranches:", err);
      flashMsg("Failed to load branches");
    }
  };

  const loadYears = async (branchId) => {
    setSelectedYear(""); setSelectedSemester(""); setSelectedSubject(""); setSelectedTopic(""); setSelectedUnit("");
    setYears([]); setSemesters([]); setSubjects([]); setTopics([]); setUnits([]);
    if (!branchId) return;
    try {
      const data = await adminAPI.getYears(branchId);
      setYears(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("loadYears:", err);
      flashMsg("Failed to load years");
    }
  };

  const loadSemesters = async (yearId) => {
    setSelectedSemester(""); setSelectedSubject(""); setSelectedTopic(""); setSelectedUnit("");
    setSemesters([]); setSubjects([]); setTopics([]); setUnits([]);
    if (!yearId) return;
    try {
      const data = await adminAPI.getSemesters(yearId);
      setSemesters(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("loadSemesters:", err);
      flashMsg("Failed to load semesters");
    }
  };

  const loadSubjects = async (semesterId) => {
    setSelectedSubject(""); setSelectedTopic(""); setSelectedUnit("");
    setSubjects([]); setTopics([]); setUnits([]);
    if (!semesterId) return;
    try {
      const data = await adminAPI.getSubjects(semesterId);
      setSubjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("loadSubjects:", err);
      flashMsg("Failed to load subjects");
    }
  };

  const loadTopics = async (subjectId) => {
    setSelectedTopic(""); setSelectedUnit("");
    setTopics([]); setUnits([]);
    if (!subjectId) return;
    try {
      const data = await adminAPI.getTopicsBySubject(subjectId);
      setTopics(Array.isArray(data) ? data : []);
      const unitsData = await adminAPI.getUnits(subjectId);
      setUnits(Array.isArray(unitsData) ? unitsData : []);
    } catch (err) {
      console.error("loadTopics:", err);
      flashMsg("Failed to load topics / units");
    }
  };

  const loadAllResources = async () => {
    try {
      const data = await adminAPI.getResources();
      setResources(Array.isArray(data) ? data : []);
      setFilteredResources(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("loadAllResources:", err);
      flashMsg("Failed to load resources");
    }
  };

  // ================= MODAL =================
  const openAddModal = () => {
    setEditingResource(null);
    setTitle(""); setSummary(""); setPdfFiles([]); setExistingPDFs([]);
    setYoutubeLinks([emptyYoutube()]); setExistingYoutubeLinks([]);
    setModalOpen(true);
  };

  const openEditModal = (resource) => {
    setEditingResource(resource);
    setTitle(resource.title || ""); setSummary(resource.summary || "");
    setPdfFiles([]); 
    setExistingPDFs(Array.isArray(resource.pdfs) ? resource.pdfs.map(p => ({...p})) : []);
    setYoutubeLinks([emptyYoutube()]); 
    setExistingYoutubeLinks(Array.isArray(resource.youtubeLinks) ? resource.youtubeLinks.map(y => ({...y})) : []);

    if (resource.branch) {
      setSelectedBranch(resource.branch._id || resource.branch);
      loadYears(resource.branch._id || resource.branch).then(() => {
        if (resource.year) {
          setSelectedYear(resource.year._id || resource.year);
          loadSemesters(resource.year._id || resource.year).then(() => {
            if (resource.semester) {
              setSelectedSemester(resource.semester._id || resource.semester);
              loadSubjects(resource.semester._id || resource.semester).then(() => {
                if (resource.subject) {
                  setSelectedSubject(resource.subject._id || resource.subject);
                  loadTopics(resource.subject._id || resource.subject).then(() => {
                    if (resource.topic) setSelectedTopic(resource.topic._id || resource.topic);
                    if (resource.unit) setSelectedUnit(resource.unit._id || resource.unit);
                  });
                }
              });
            }
          });
        }
      });
    }
    setModalOpen(true);
  };

  const addYoutube = () => setYoutubeLinks((s) => [...s, emptyYoutube()]);
  const removeYoutube = (idx) => setYoutubeLinks((s) => s.filter((_, i) => i !== idx));
  const updateYoutube = (idx, key, val) =>
    setYoutubeLinks((s) => s.map((y, i) => (i === idx ? { ...y, [key]: val } : y)));
  const removeExistingYoutube = (idx) =>
    setExistingYoutubeLinks((s) => s.filter((_, i) => i !== idx));
  const removeExistingPDF = (idx) =>
    setExistingPDFs((s) => s.filter((_, i) => i !== idx));

  // ================= SUBMIT =================
const submitResource = async (e) => {
  e.preventDefault();

  if (!editingResource && !selectedTopic)
    return flashMsg("Please select Topic before adding resource.");
  if (!title.trim()) return flashMsg("Please provide a title.");

  setLoading(true);

  try {
    const allYoutubeLinks = [
      ...existingYoutubeLinks,
      ...youtubeLinks.filter((y) => y.url.trim())
    ];

    // PDFs that are kept from existing ones
    const pdfsToKeep = existingPDFs.filter((p) => p.fileType === "file");

    // Collect all PDF URLs (manually added ones are already in existingPDFs)
const pdfUrls = existingPDFs
  .filter((p) => p.fileType === "url")
  .map((p) => p.url.trim())
  .filter(Boolean);


    // ---- EDIT existing resource ----
    if (editingResource) {
      await adminAPI.updateResource(editingResource._id, {
        title,
        summary,
        difficulty: editingResource?.difficulty || "easy",
        tags: editingResource?.tags || [],
        youtubeLinks: allYoutubeLinks,
        pdfFiles, // new uploaded files
        pdfUrls,  // array of plain URLs
        pdfsToKeep,
      });

      flashMsg("Resource updated successfully");
    }

    // ---- ADD new resource ----
    else {
      await adminAPI.addResource(selectedTopic, {
        title,
        summary,
        difficulty: "easy",
        tags: [],
        youtubeLinks: youtubeLinks.filter((y) => y.url.trim()),
        pdfFiles, // uploaded files
        pdfUrls,  // array of plain URLs
      });

      flashMsg("Resource added successfully");
    }

    setModalOpen(false);
    await loadAllResources();
  } catch (err) {
    console.error("submitResource error:", err);
    flashMsg(err?.response?.data?.message || "Failed to save resource");
  } finally {
    setLoading(false);
  }
};

  // ================= DELETE =================
  const handleDeleteResource = async (id) => {
    if (!window.confirm("Delete this resource?")) return;
    try {
      await adminAPI.deleteResource(id);
      flashMsg("Resource deleted");
      loadAllResources();
    } catch (err) {
      console.error("handleDeleteResource:", err);
      flashMsg("Delete failed");
    }
  };

  // ================= FILTER =================
  const applySelectionFilter = () => {
    let list = resources.slice();
    if (selectedBranch) list = list.filter((r) => (r.branch?._id || r.branch) === selectedBranch);
    if (selectedYear) list = list.filter((r) => (r.year?._id || r.year) === selectedYear);
    if (selectedSemester) list = list.filter((r) => (r.semester?._id || r.semester) === selectedSemester);
    if (selectedSubject) list = list.filter((r) => (r.subject?._id || r.subject) === selectedSubject);
    if (selectedTopic) list = list.filter((r) => (r.topic?._id || r.topic) === selectedTopic);
    if (selectedUnit) list = list.filter((r) => (r.unit?._id || r.unit) === selectedUnit);
    setFilteredResources(list);
  };
  useEffect(() => {
    applySelectionFilter();
  }, [selectedBranch, selectedYear, selectedSemester, selectedSubject, selectedTopic, selectedUnit, resources]);

  // ================= RETURN UI =================
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-800 dark:text-gray-100 tracking-tight">Manage Resources</h1>

      <AnimatePresence>
        {msg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4 text-sm text-white bg-indigo-600 px-4 py-2 rounded shadow-lg"
          >
            {msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-6">
        {[{value: selectedBranch, set: setSelectedBranch, load: loadYears, label: "Branch", data: branches},
          {value: selectedYear, set: setSelectedYear, load: loadSemesters, label: "Year", data: years},
          {value: selectedSemester, set: setSelectedSemester, load: loadSubjects, label: "Semester", data: semesters},
          {value: selectedSubject, set: setSelectedSubject, load: loadTopics, label: "Subject", data: subjects},
          {value: selectedTopic, set: setSelectedTopic, label: "Topic", data: topics},
          {value: selectedUnit, set: setSelectedUnit, label: "Unit (optional)", data: units}
        ].map((f, idx) => (
          <select
            key={idx}
            value={f.value}
            onChange={(e) => {f.set(e.target.value); f.load && f.load(e.target.value)}}
            className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-gray-100 hover:shadow-md transition duration-200"
          >
            <option value="">{f.label}</option>
            {f.data.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
          </select>
        ))}
      </div>

      {/* SEARCH + ADD */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search resources..."
          className="border p-3 rounded-lg w-full max-w-lg shadow-sm focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-gray-100 transition duration-200"
        />
        <Button
          onClick={openAddModal}
          className="px-6 py-3 mt-2 md:mt-0 font-semibold text-white rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
          + Add Resource
        </Button>
      </div>

      {/* RESOURCE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.length ? filteredResources.map((r) => (
          <motion.div
            key={r._id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            className="p-5 rounded-2xl shadow-lg backdrop-blur-md bg-white/70 dark:bg-gray-800/70 hover:shadow-2xl transition duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{r.title}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">• {r.topic?.name || "—"}</span>
                <span className="text-sm text-gray-400 dark:text-gray-500">• {r.subject?.name || "—"}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{r.summary || "No summary"}</p>
<div className="mt-3 flex flex-wrap gap-2">
  {/* YouTube Links */}
  {Array.isArray(r.youtubeLinks) && r.youtubeLinks.map((y, i) => (
    <a
      key={`youtube-${i}`}
      href={y.url}
      target="_blank"
      rel="noreferrer"
      className="text-xs px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-100 font-medium hover:scale-105 transition-transform"
    >
      Youtube {y.rank ?? i + 1}
    </a>
  ))}

  {/* Merge all PDFs: uploaded + URLs */}
  {[
    ...(Array.isArray(r.pdfs) ? r.pdfs : []),
    ...(Array.isArray(r.pdfUrls) ? r.pdfUrls.map((url) => ({ url })) : [])
  ].map((p, i) => (
    <a
      key={`pdf-${i}`}
      href={p.url}
      target="_blank"
      rel="noreferrer"
      className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 font-medium hover:scale-105 transition-transform"
    >
      PDF {i + 1}
    </a>
  ))}
</div>

              <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">Added: {dayjs(r.createdAt).format("DD MMM YYYY")}</div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="flex gap-3">
                <Button size="sm" onClick={() => openEditModal(r)} className="px-4 py-1 text-white bg-gradient-to-r from-pink-600 to-orange-500 hover:scale-105 transition-transform">Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDeleteResource(r._id)} className="px-4 py-1 text-white bg-gradient-to-r from-red-500 to-rose-400 hover:scale-105 transition-transform">Delete</Button>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{r.addedBy?.firstName ? `${r.addedBy.firstName} ${r.addedBy.lastName || ""}` : ""}</div>
            </div>
          </motion.div>
        )) : <p className="text-gray-500 dark:text-gray-400">No resources found.</p>}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          >
            <motion.form
              onSubmit={submitResource}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-3xl w-full max-w-3xl shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <h2 className="text-2xl font-bold mb-4">{editingResource ? "Edit Resource" : "Add Resource"}</h2>

              <div className="grid grid-cols-1 gap-4 mb-4">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="border p-3 rounded-lg dark:bg-gray-700 dark:text-gray-100"
                  required
                />
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Summary"
                  className="border p-3 rounded-lg dark:bg-gray-700 dark:text-gray-100"
                />
              </div>

              {/* TABS */}
              <Tab.Group>
                <Tab.List className="flex gap-2 mb-4">
                  <Tab className={({ selected }) => `px-4 py-2 rounded-lg font-medium ${selected ? "bg-indigo-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`}>YouTube</Tab>
                  <Tab className={({ selected }) => `px-4 py-2 rounded-lg font-medium ${selected ? "bg-indigo-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`}>PDFs</Tab>
                </Tab.List>

                <Tab.Panels>
                  {/* YouTube Tab */}
                  <Tab.Panel>
                    {/* Existing */}
                    {existingYoutubeLinks.map((y, idx) => (
                      <div key={idx} className="flex gap-2 items-center mb-2">
                        <input type="text" value={y.url} onChange={(e) => {
                          const copy = [...existingYoutubeLinks];
                          copy[idx].url = e.target.value;
                          setExistingYoutubeLinks(copy);
                        }} className="border p-2 rounded-lg w-full dark:bg-gray-700 dark:text-gray-100" />
                        <Button size="sm" onClick={() => removeExistingYoutube(idx)}>Remove</Button>
                      </div>
                    ))}

                    {/* New */}
                    {youtubeLinks.map((y, idx) => (
                      <div key={idx} className="flex gap-2 items-center mb-2">
                        <input type="text" value={y.url} onChange={(e) => updateYoutube(idx, "url", e.target.value)} className="border p-2 rounded-lg w-full dark:bg-gray-700 dark:text-gray-100" placeholder="https://youtube.com/..." />
                        <Button size="sm" onClick={() => removeYoutube(idx)}>Remove</Button>
                      </div>
                    ))}
                    <Button size="sm" onClick={addYoutube} className="mt-2 px-4 py-1">+ Add YouTube</Button>
                  </Tab.Panel>

                  {/* PDF Tab */}
                  <Tab.Panel>
                    {/* Existing PDFs */}
                    {existingPDFs.length > 0 && existingPDFs.map((p, idx) => (
                      <div key={idx} className="flex gap-2 items-center mb-2">
                        <a href={p.url} target="_blank" rel="noreferrer" className="underline w-full" style={{ color: p.fileType === "url" ? "#16a34a" : "#059669" }}>
                          {p.filename || p.name || `PDF ${idx+1}`} ({p.fileType === "url" ? "URL" : "File"})
                        </a>
                        <Button size="sm" onClick={() => removeExistingPDF(idx)}>Remove</Button>
                      </div>
                    ))}

                    {/* Upload new PDF files */}
                    {pdfFiles.map((file, idx) => (
                      <div key={idx} className="flex gap-2 items-center mb-2">
                        <input type="file" accept="application/pdf" onChange={(e) => {
                          const newFiles = [...pdfFiles];
                          newFiles[idx] = e.target.files[0];
                          setPdfFiles(newFiles);
                        }} className="border p-2 rounded-lg w-full dark:bg-gray-700 dark:text-gray-100" />
                        <Button size="sm" onClick={() => setPdfFiles(pdfFiles.filter((_, i) => i!==idx))}>Remove</Button>
                      </div>
                    ))}
                    <Button size="sm" onClick={() => setPdfFiles([...pdfFiles, null])} className="mt-2 px-4 py-1">+ Add PDF File</Button>

                    {/* Add PDF URLs */}
                    <div className="mt-4">
                      <input type="text" placeholder="https://example.com/file.pdf" value={pdfUrlInput} onChange={(e) => setPdfUrlInput(e.target.value)} className="border p-2 rounded-lg w-full dark:bg-gray-700 dark:text-gray-100" />
                      <Button size="sm" onClick={() => {
                        if(pdfUrlInput.trim()) {
                          setExistingPDFs([...existingPDFs, { url: pdfUrlInput.trim(), filename: pdfUrlInput.split("/").pop(), fileType: "url" }]);
                          setPdfUrlInput("");
                        }
                      }} className="mt-2 px-4 py-1">+ Add PDF URL</Button>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>

              <div className="mt-6 flex justify-end gap-3">
                <Button onClick={() => setModalOpen(false)} variant="outline">Cancel</Button>
                <Button type="submit" disabled={loading} className="bg-indigo-600 text-white hover:bg-indigo-700">{loading ? "Saving..." : "Save"}</Button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default AdminResources;
