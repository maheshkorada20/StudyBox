// import React, { useEffect, useState } from "react";
// import { adminAPI } from "@/api/admin";
// import { Button } from "@/components/ui/button";

// const AdminSemesters = () => {
//   const [branches, setBranches] = useState([]);
//   const [years, setYears] = useState([]);
//   const [semesters, setSemesters] = useState([]);
//   const [filteredSemesters, setFilteredSemesters] = useState([]);

//   const [selectedBranch, setSelectedBranch] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");

//   const [search, setSearch] = useState("");

//   // modal / form state
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingSemester, setEditingSemester] = useState(null);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);

//   // flash message
//   const [message, setMessage] = useState("");

//   // Fetch branches once
//   const fetchBranches = async () => {
//     try {
//       const data = await adminAPI.getBranches();
//       const list = Array.isArray(data) ? data : [];
//       setBranches(list);
//     } catch (err) {
//       console.error("Failed to load branches:", err);
//       setMessage("Failed to load branches. Check console/network.");
//       setTimeout(() => setMessage(""), 3000);
//     }
//   };

//   // Fetch years for branch
//   const fetchYears = async (branchId) => {
//     if (!branchId) {
//       setYears([]);
//       setSelectedYear("");
//       return;
//     }
//     try {
//       const data = await adminAPI.getYears(branchId);
//       const list = Array.isArray(data) ? data : [];
//       setYears(list);
//       // If there's at least one year, optionally select first
//       // but keep current selection if still valid
//       if (!list.find((y) => y._id === selectedYear)) {
//         setSelectedYear(list[0]?._id || "");
//       }
//     } catch (err) {
//       console.error("Failed to load years:", err);
//       setMessage("Failed to load years. Check console/network.");
//       setTimeout(() => setMessage(""), 3000);
//     }
//   };

//   // Fetch semesters for year
//   const fetchSemesters = async (yearId) => {
//     if (!yearId) {
//       setSemesters([]);
//       setFilteredSemesters([]);
//       return;
//     }
//     try {
//       const data = await adminAPI.getSemesters(yearId);
//       const list = Array.isArray(data) ? data : [];
//       // newest first
//       list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setSemesters(list);
//       setFilteredSemesters(list);
//     } catch (err) {
//       console.error("Failed to load semesters:", err);
//       setMessage("Failed to load semesters. Check console/network.");
//       setTimeout(() => setMessage(""), 3000);
//     }
//   };

//   useEffect(() => {
//     fetchBranches();
//   }, []);

//   // When selectedBranch changes, load years
//   useEffect(() => {
//     if (selectedBranch) fetchYears(selectedBranch);
//     else {
//       setYears([]);
//       setSelectedYear("");
//       setSemesters([]);
//       setFilteredSemesters([]);
//     }
//   }, [selectedBranch]);

//   // When selectedYear changes, load semesters
//   useEffect(() => {
//     if (selectedYear) fetchSemesters(selectedYear);
//     else {
//       setSemesters([]);
//       setFilteredSemesters([]);
//     }
//   }, [selectedYear]);

//   // filter semesters by search
//   useEffect(() => {
//     const s = search.trim().toLowerCase();
//     if (!s) {
//       setFilteredSemesters(semesters);
//     } else {
//       setFilteredSemesters(
//         semesters.filter(
//           (sem) =>
//             sem.name?.toLowerCase().includes(s) ||
//             (sem.description || "").toLowerCase().includes(s)
//         )
//       );
//     }
//   }, [search, semesters]);

//   const resetForm = () => {
//     setName("");
//     setDescription("");
//     setEditingSemester(null);
//   };

//   const openAddModal = () => {
//     resetForm();
//     setModalOpen(true);
//   };

//   const openEditModal = (sem) => {
//     setEditingSemester(sem);
//     setName(sem.name || "");
//     setDescription(sem.description || "");
//     setModalOpen(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedYear) {
//       setMessage("Please select a year first.");
//       setTimeout(() => setMessage(""), 3000);
//       return;
//     }
//     if (!name.trim()) {
//       setMessage("Semester name is required.");
//       setTimeout(() => setMessage(""), 3000);
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = { name: name.trim(), description: description.trim() };
//       if (editingSemester) {
//         await adminAPI.updateSemester(editingSemester._id, payload);
//         setMessage("Semester updated successfully!");
//       } else {
//         // add to selected year
//         await adminAPI.addSemester(selectedYear, payload);
//         setMessage("Semester added successfully!");
//       }

//       setModalOpen(false);
//       resetForm();
//       await fetchSemesters(selectedYear);
//       setTimeout(() => setMessage(""), 3000);
//     } catch (err) {
//       console.error("Add/Update semester failed:", err);
//       setMessage(err?.response?.data?.message || "Operation failed. Check console/network.");
//       setTimeout(() => setMessage(""), 3000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this semester?")) return;
//     setLoading(true);
//     try {
//       await adminAPI.deleteSemester(id);
//       setMessage("Semester deleted successfully!");
//       await fetchSemesters(selectedYear);
//       setTimeout(() => setMessage(""), 3000);
//     } catch (err) {
//       console.error("Delete semester failed:", err);
//       setMessage("Delete failed. Check console/network.");
//       setTimeout(() => setMessage(""), 3000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="p-6">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Semesters</h1>

//       {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}

//       {/* selectors */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Select Branch</label>
//           <select
//             value={selectedBranch}
//             onChange={(e) => setSelectedBranch(e.target.value)}
//             className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-400 transition-all"
//           >
//             <option value="">-- Choose branch --</option>
//             {branches.map((b) => (
//               <option key={b._id} value={b._id}>
//                 {b.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Select Year</label>
//           <select
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(e.target.value)}
//             className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-400 transition-all"
//             disabled={!selectedBranch || years.length === 0}
//           >
//             <option value="">-- Choose year --</option>
//             {years.map((y) => (
//               <option key={y._id} value={y._id}>
//                 {y.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex gap-2 justify-end">
//           <input
//             type="text"
//             placeholder="Search semesters..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border p-2 rounded-md w-full max-w-xs focus:ring-2 focus:ring-indigo-400 transition-all"
//             disabled={!selectedYear}
//           />
//           <Button
//             onClick={openAddModal}
//             className="relative inline-flex items-center justify-center px-5 py-2 font-medium text-white rounded-md shadow-md overflow-hidden transition-all transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 before:absolute before:inset-0 before:bg-white before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-10"
//             disabled={!selectedYear}
//           >
//             Add Semester
//           </Button>
//         </div>
//       </div>

//       {/* Semesters list */}
//       <div>
//         {filteredSemesters.length ? (
//           <ul className="space-y-3">
//             {filteredSemesters.map((sem) => (
//               <li
//                 key={sem._id}
//                 className="flex justify-between items-center p-4 border rounded-md shadow-sm hover:shadow-lg transition-shadow bg-white"
//               >
//                 <div>
//                   <p className="font-semibold text-gray-800">{sem.name}</p>
//                   <p className="text-sm text-gray-500">{sem.description}</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <Button
//                     size="sm"
//                     onClick={() => openEditModal(sem)}
//                     className="px-3 py-1 font-medium text-white rounded-md shadow hover:scale-105 hover:shadow-lg transition-transform bg-gradient-to-r from-pink-700 to-orange-600"
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     size="sm"
//                     onClick={() => handleDelete(sem._id)}
//                     className="px-3 py-1 font-medium text-white rounded-md shadow hover:scale-105 hover:shadow-lg transition-transform bg-gradient-to-r from-red-500 to-rose-400"
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">No semesters found for selected year.</p>
//         )}
//       </div>

//       {/* modal (custom) */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl animate-fadeIn">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//               {editingSemester ? "Edit Semester" : "Add Semester"}
//             </h2>

//             <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//               <input
//                 type="text"
//                 placeholder="Semester Name (e.g. Semester 1)"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="border p-2 rounded-md w-full focus:ring-2 focus:ring-indigo-400 transition-all"
//                 required
//               />
//               <textarea
//                 placeholder="Description (optional)"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="border p-2 rounded-md w-full focus:ring-2 focus:ring-indigo-400 transition-all"
//               />
//               <div className="flex justify-end gap-2 mt-4">
//                 <Button
//                   type="submit"
//                   disabled={loading}
//                   className="relative inline-flex items-center justify-center px-5 py-2 font-medium text-white rounded-md shadow-md overflow-hidden transition-all transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 before:absolute before:inset-0 before:bg-white before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-10"
//                 >
//                   {loading ? (editingSemester ? "Updating..." : "Adding...") : (editingSemester ? "Update" : "Add")}
//                 </Button>

//                 <Button
//                   type="button"
//                   onClick={() => { resetForm(); setModalOpen(false); }}
//                   className="relative inline-flex items-center justify-center px-5 py-2 font-medium text-gray-800 rounded-md shadow-md border border-gray-300 overflow-hidden transition-all transform hover:scale-105 hover:shadow-lg hover:bg-gray-100"
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

// export default AdminSemesters;

import React, { useEffect, useState } from "react";
import { adminAPI } from "@/api/admin";
import { Button } from "@/components/ui/button";

const AdminSemesters = () => {
  const [branches, setBranches] = useState([]);
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [filteredSemesters, setFilteredSemesters] = useState([]);

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSemester, setEditingSemester] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const fetchBranches = async () => {
    try {
      const data = await adminAPI.getBranches();
      setBranches(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load branches. Check console/network.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const fetchYears = async (branchId) => {
    if (!branchId) {
      setYears([]);
      setSelectedYear("");
      return;
    }
    try {
      const data = await adminAPI.getYears(branchId);
      const list = Array.isArray(data) ? data : [];
      setYears(list);
      if (!list.find((y) => y._id === selectedYear)) setSelectedYear(list[0]?._id || "");
    } catch (err) {
      console.error(err);
      setMessage("Failed to load years. Check console/network.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const fetchSemesters = async (yearId) => {
    if (!yearId) {
      setSemesters([]);
      setFilteredSemesters([]);
      return;
    }
    try {
      const data = await adminAPI.getSemesters(yearId);
      const list = Array.isArray(data) ? data : [];
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setSemesters(list);
      setFilteredSemesters(list);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load semesters. Check console/network.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    if (selectedBranch) fetchYears(selectedBranch);
    else {
      setYears([]);
      setSelectedYear("");
      setSemesters([]);
      setFilteredSemesters([]);
    }
  }, [selectedBranch]);

  useEffect(() => {
    if (selectedYear) fetchSemesters(selectedYear);
    else {
      setSemesters([]);
      setFilteredSemesters([]);
    }
  }, [selectedYear]);

  useEffect(() => {
    const s = search.trim().toLowerCase();
    setFilteredSemesters(
      !s
        ? semesters
        : semesters.filter(
            (sem) =>
              sem.name?.toLowerCase().includes(s) ||
              (sem.description || "").toLowerCase().includes(s)
          )
    );
  }, [search, semesters]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditingSemester(null);
  };

  const openAddModal = () => {
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (sem) => {
    setEditingSemester(sem);
    setName(sem.name || "");
    setDescription(sem.description || "");
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedYear) return setMessage("Please select a year first.");
    if (!name.trim()) return setMessage("Semester name is required.");

    setLoading(true);
    try {
      const payload = { name: name.trim(), description: description.trim() };
      if (editingSemester) {
        await adminAPI.updateSemester(editingSemester._id, payload);
        setMessage("Semester updated successfully!");
      } else {
        await adminAPI.addSemester(selectedYear, payload);
        setMessage("Semester added successfully!");
      }
      setModalOpen(false);
      resetForm();
      await fetchSemesters(selectedYear);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || "Operation failed. Check console/network.");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this semester?")) return;
    setLoading(true);
    try {
      await adminAPI.deleteSemester(id);
      setMessage("Semester deleted successfully!");
      await fetchSemesters(selectedYear);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Delete failed. Check console/network.");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Manage Semesters</h1>
      {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}

      {/* Dropdowns */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        {[{
          label: "Branch", value: selectedBranch, set: setSelectedBranch, load: fetchYears, data: branches
        },{
          label: "Year", value: selectedYear, set: setSelectedYear, load: fetchSemesters, data: years
        }].map((f, i) => (
          <select
            key={i} value={f.value} onChange={(e)=>{f.set(e.target.value); f.load(e.target.value);}}
            className="border p-2 rounded-md w-full sm:w-1/2 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="">{f.label}</option>
            {f.data.map(d=><option key={d._id} value={d._id}>{d.name}</option>)}
          </select>
        ))}
      </div>

      {/* Search + Add */}
      <div className="flex justify-between items-center mb-4 gap-3">
        <input
          type="text"
          placeholder="Search semesters..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="border p-2 rounded-md w-full max-w-sm dark:bg-gray-700 dark:text-gray-100"
          disabled={!selectedYear}
        />
        <Button
          onClick={openAddModal}
          className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-md"
          disabled={!selectedYear}
        >
          Add Semester
        </Button>
      </div>

      {/* Semesters List */}
      {filteredSemesters.length ? (
        <ul className="space-y-3">
          {filteredSemesters.map(sem => (
            <li key={sem._id} className="flex justify-between items-center p-4 border rounded-md shadow-sm hover:shadow-lg bg-white dark:bg-gray-800">
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{sem.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{sem.description}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={()=>openEditModal(sem)} className="px-3 py-1 text-white rounded-md bg-gradient-to-r from-pink-700 to-orange-600">Edit</Button>
                <Button size="sm" onClick={()=>handleDelete(sem._id)} className="px-3 py-1 text-white rounded-md bg-gradient-to-r from-lime-500 to-yellow-400">Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      ) : selectedYear ? <p className="text-gray-500 dark:text-gray-400">No semesters found for selected year.</p> : null}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">{editingSemester ? "Edit Semester" : "Add Semester"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input type="text" placeholder="Semester Name" value={name} onChange={(e)=>setName(e.target.value)}
                className="border p-2 rounded-md w-full dark:bg-gray-700 dark:text-gray-100" required />
              <textarea placeholder="Description (optional)" value={description} onChange={(e)=>setDescription(e.target.value)}
                className="border p-2 rounded-md w-full dark:bg-gray-700 dark:text-gray-100" />
              <div className="flex justify-end gap-2 mt-4">
                <Button type="submit" disabled={loading} className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-md">{editingSemester ? "Update" : "Add"}</Button>
                <Button type="button" onClick={()=>{resetForm(); setModalOpen(false);}} className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md">Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSemesters;
