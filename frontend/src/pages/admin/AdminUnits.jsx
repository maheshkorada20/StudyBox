// import React, { useState, useEffect } from "react";
// import { adminAPI } from "@/api/admin";
// import { Button } from "@/components/ui/button";

// const AdminUnits = () => {
//   const [branches, setBranches] = useState([]);
//   const [years, setYears] = useState([]);
//   const [semesters, setSemesters] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [units, setUnits] = useState([]);
//   const [filteredUnits, setFilteredUnits] = useState([]);

//   const [selectedBranch, setSelectedBranch] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedSemester, setSelectedSemester] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");

//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingUnit, setEditingUnit] = useState(null);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Load branches
//   const loadBranches = async () => {
//     try {
//       const data = await adminAPI.getBranches();
//       setBranches(data || []);
//     } catch (err) {
//       console.error(err);
//       setMessage("Failed to load branches");
//       setTimeout(() => setMessage(""), 3000);
//     }
//   };

//   // Load years
//   const loadYears = async (branchId) => {
//     setSelectedYear("");
//     setSemesters([]);
//     setSelectedSemester("");
//     setSubjects([]);
//     setSelectedSubject("");
//     setUnits([]);
//     try {
//       const data = await adminAPI.getYears(branchId);
//       setYears(data || []);
//     } catch (err) {
//       console.error(err);
//       setMessage("Failed to load years");
//       setTimeout(() => setMessage(""), 3000);
//     }
//   };

//   // Load semesters
//   const loadSemesters = async (yearId) => {
//     setSelectedSemester("");
//     setSubjects([]);
//     setSelectedSubject("");
//     setUnits([]);
//     try {
//       const data = await adminAPI.getSemesters(yearId);
//       setSemesters(data || []);
//     } catch (err) {
//       console.error(err);
//       setMessage("Failed to load semesters");
//       setTimeout(() => setMessage(""), 3000);
//     }
//   };

//   // Load subjects
//   const loadSubjects = async (semesterId) => {
//     setSelectedSubject("");
//     setUnits([]);
//     try {
//       const data = await adminAPI.getSubjects(semesterId);
//       setSubjects(data || []);
//     } catch (err) {
//       console.error(err);
//       setMessage("Failed to load subjects");
//       setTimeout(() => setMessage(""), 3000);
//     }
//   };

//   // Load units
//   const loadUnits = async (subjectId) => {
//     try {
//       const data = await adminAPI.getUnits(subjectId);
//       setUnits(data || []);
//       setFilteredUnits(data || []);
//     } catch (err) {
//       console.error(err);
//       setMessage("Failed to load units");
//       setTimeout(() => setMessage(""), 3000);
//     }
//   };

//   // Filter units
//   useEffect(() => {
//     const filtered = units.filter((u) =>
//       u.name?.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredUnits(filtered);
//   }, [search, units]);

//   useEffect(() => {
//     loadBranches();
//   }, []);

//   // Reset modal form
//   const resetForm = () => {
//     setName("");
//     setDescription("");
//     setEditingUnit(null);
//   };

//   // Add / Update unit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name.trim()) {
//       setMessage("Unit name is required");
//       setTimeout(() => setMessage(""), 3000);
//       return;
//     }
//     if (!selectedSubject) {
//       setMessage("Please select a subject");
//       setTimeout(() => setMessage(""), 3000);
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = { name: name.trim(), description: description.trim() };
//       if (editingUnit) {
//         await adminAPI.updateUnit(editingUnit._id, payload);
//         setMessage("Unit updated successfully!");
//       } else {
//         await adminAPI.addUnit(selectedSubject, payload);
//         setMessage("Unit added successfully!");
//       }
//       setModalOpen(false);
//       resetForm();
//       loadUnits(selectedSubject);
//       setTimeout(() => setMessage(""), 3000);
//     } catch (err) {
//       console.error(err);
//       setMessage(err?.response?.data?.message || "Operation failed");
//       setTimeout(() => setMessage(""), 3000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (unit) => {
//     setEditingUnit(unit);
//     setName(unit.name || "");
//     setDescription(unit.description || "");
//     setModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this unit?")) return;
//     setLoading(true);
//     try {
//       await adminAPI.deleteUnit(id);
//       setMessage("Unit deleted successfully!");
//       loadUnits(selectedSubject);
//       setTimeout(() => setMessage(""), 3000);
//     } catch (err) {
//       console.error(err);
//       setMessage(err?.response?.data?.message || "Delete failed");
//       setTimeout(() => setMessage(""), 3000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Units</h1>
//       {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}

//       {/* Dropdowns */}
//       <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
//         <select
//           value={selectedBranch}
//           onChange={(e) => { setSelectedBranch(e.target.value); loadYears(e.target.value); }}
//           className="border p-2 rounded-md w-full sm:w-1/5 focus:ring-2 focus:ring-indigo-400 transition-all"
//         >
//           <option value="">Select Branch</option>
//           {branches.map((b) => <option key={b._id} value={b._id}>{b.name}</option>)}
//         </select>

//         <select
//           value={selectedYear}
//           onChange={(e) => { setSelectedYear(e.target.value); loadSemesters(e.target.value); }}
//           className="border p-2 rounded-md w-full sm:w-1/5 focus:ring-2 focus:ring-indigo-400 transition-all"
//           disabled={!selectedBranch}
//         >
//           <option value="">Select Year</option>
//           {years.map((y) => <option key={y._id} value={y._id}>{y.name}</option>)}
//         </select>

//         <select
//           value={selectedSemester}
//           onChange={(e) => { setSelectedSemester(e.target.value); loadSubjects(e.target.value); }}
//           className="border p-2 rounded-md w-full sm:w-1/5 focus:ring-2 focus:ring-indigo-400 transition-all"
//           disabled={!selectedYear}
//         >
//           <option value="">Select Semester</option>
//           {semesters.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
//         </select>

//         <select
//           value={selectedSubject}
//           onChange={(e) => { setSelectedSubject(e.target.value); loadUnits(e.target.value); }}
//           className="border p-2 rounded-md w-full sm:w-1/5 focus:ring-2 focus:ring-indigo-400 transition-all"
//           disabled={!selectedSemester}
//         >
//           <option value="">Select Subject</option>
//           {subjects.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
//         </select>
//       </div>

//       {/* Search + Add */}
//       <div className="flex justify-between items-center mb-4 gap-3">
//         <input
//           type="text"
//           placeholder="Search units..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border p-2 rounded-md w-full max-w-sm focus:ring-2 focus:ring-indigo-400 transition-all"
//           disabled={!selectedSubject}
//         />
//         <Button
//           onClick={() => { resetForm(); setModalOpen(true); }}
//           className="relative inline-flex items-center justify-center px-6 py-2 font-medium text-white rounded-md shadow-md transition-all transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500"
//           disabled={!selectedSubject}
//         >
//           Add Unit
//         </Button>
//       </div>

//       {/* Unit List */}
//       {filteredUnits.length ? (
//         <ul className="space-y-3">
//           {filteredUnits.map((unit) => (
//             <li key={unit._id} className="flex justify-between items-center p-4 border rounded-md shadow-sm hover:shadow-lg transition-shadow bg-white">
//               <div>
//                 <p className="font-semibold text-gray-800">{unit.name}</p>
//                 <p className="text-sm text-gray-500">{unit.description}</p>
//               </div>
//               <div className="flex gap-2">
//                 <Button
//                   size="sm"
//                   onClick={() => handleEdit(unit)}
//                   className="px-3 py-1 font-medium text-white rounded-md shadow hover:scale-105 hover:shadow-lg transition-transform bg-gradient-to-r from-pink-700 to-orange-600"
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   size="sm"
//                   onClick={() => handleDelete(unit._id)}
//                   className="px-3 py-1 font-medium text-white rounded-md shadow hover:scale-105 hover:shadow-lg transition-transform bg-gradient-to-r from-lime-500 to-yellow-400"
//                 >
//                   Delete
//                 </Button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-500">No units found.</p>
//       )}

//       {/* Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl animate-fadeIn">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-800">{editingUnit ? "Edit Unit" : "Add Unit"}</h2>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//               <input
//                 type="text"
//                 placeholder="Unit Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="border p-2 rounded-md w-full focus:ring-2 focus:ring-indigo-400 transition-all"
//                 required
//               />
//               <textarea
//                 placeholder="Unit Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="border p-2 rounded-md w-full focus:ring-2 focus:ring-indigo-400 transition-all"
//               />
//               <div className="flex justify-end gap-2 mt-4">
//                 <Button
//                   type="submit"
//                   disabled={loading}
//                   className="relative inline-flex items-center justify-center px-6 py-2 font-medium text-white rounded-md shadow-md transition-all transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500"
//                 >
//                   {loading ? (editingUnit ? "Updating..." : "Adding...") : (editingUnit ? "Update" : "Add")}
//                 </Button>
//                 <Button
//                   type="button"
//                   onClick={() => { resetForm(); setModalOpen(false); }}
//                   className="relative inline-flex items-center justify-center px-6 py-2 font-medium text-gray-800 rounded-md shadow-md border border-gray-300 transition-all transform hover:scale-105 hover:shadow-lg hover:bg-gray-100"
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminUnits;


import React, { useState, useEffect } from "react";
import { adminAPI } from "@/api/admin";
import { Button } from "@/components/ui/button";

const AdminUnits = () => {
  const [branches, setBranches] = useState([]);
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [units, setUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load branches
  const loadBranches = async () => {
    try {
      const data = await adminAPI.getBranches();
      setBranches(data || []);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load branches");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Load years
  const loadYears = async (branchId) => {
    setSelectedYear("");
    setSemesters([]); setSelectedSemester("");
    setSubjects([]); setSelectedSubject("");
    setUnits([]); 
    try {
      const data = await adminAPI.getYears(branchId);
      setYears(data || []);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load years");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Load semesters
  const loadSemesters = async (yearId) => {
    setSelectedSemester("");
    setSubjects([]); setSelectedSubject("");
    setUnits([]); 
    try {
      const data = await adminAPI.getSemesters(yearId);
      setSemesters(data || []);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load semesters");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Load subjects
  const loadSubjects = async (semesterId) => {
    setSelectedSubject("");
    setUnits([]); 
    try {
      const data = await adminAPI.getSubjects(semesterId);
      setSubjects(data || []);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load subjects");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Load units
  const loadUnits = async (subjectId) => {
    try {
      const data = await adminAPI.getUnits(subjectId);
      setUnits(data || []);
      setFilteredUnits(data || []);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load units");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Filter units
  useEffect(() => {
    const filtered = units.filter((u) =>
      u.name?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUnits(filtered);
  }, [search, units]);

  useEffect(() => {
    loadBranches();
  }, []);

  // Reset modal form
  const resetForm = () => {
    setName(""); setDescription(""); setEditingUnit(null);
  };

  // Add / Update unit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setMessage("Unit name is required");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    if (!selectedSubject) {
      setMessage("Please select a subject");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setLoading(true);
    try {
      const payload = { name: name.trim(), description: description.trim() };
      if (editingUnit) {
        await adminAPI.updateUnit(editingUnit._id, payload);
        setMessage("Unit updated successfully!");
      } else {
        await adminAPI.addUnit(selectedSubject, payload);
        setMessage("Unit added successfully!");
      }
      setModalOpen(false);
      resetForm();
      loadUnits(selectedSubject);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || "Operation failed");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (unit) => {
    setEditingUnit(unit);
    setName(unit.name || "");
    setDescription(unit.description || "");
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this unit?")) return;
    setLoading(true);
    try {
      await adminAPI.deleteUnit(id);
      setMessage("Unit deleted successfully!");
      loadUnits(selectedSubject);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || "Delete failed");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Manage Units</h1>
      {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}

      {/* Dropdowns */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        {[{
          label: "Branch",
          value: selectedBranch,
          set: setSelectedBranch,
          load: loadYears,
          data: branches
        },
        {
          label: "Year",
          value: selectedYear,
          set: setSelectedYear,
          load: loadSemesters,
          data: years
        },
        {
          label: "Semester",
          value: selectedSemester,
          set: setSelectedSemester,
          load: loadSubjects,
          data: semesters
        },
        {
          label: "Subject",
          value: selectedSubject,
          set: setSelectedSubject,
          load: loadUnits,
          data: subjects
        }].map((f, i) => (
          <select
            key={i}
            value={f.value}
            onChange={(e) => { f.set(e.target.value); f.load(e.target.value); }}
            className="border p-2 rounded-md w-full sm:w-1/5 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="">{f.label}</option>
            {f.data.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
          </select>
        ))}
      </div>

      {/* Search + Add */}
      <div className="flex justify-between items-center mb-4 gap-3">
        <input
          type="text"
          placeholder="Search units..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-md w-full max-w-sm dark:bg-gray-700 dark:text-gray-100"
          disabled={!selectedSubject}
        />
        <Button
          onClick={() => { resetForm(); setModalOpen(true); }}
          className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-md"
          disabled={!selectedSubject}
        >
          Add Unit
        </Button>
      </div>

      {/* Unit list */}
      <ul className="space-y-3">
        {filteredUnits.map((unit) => (
          <li key={unit._id} className="flex justify-between items-center p-4 border rounded-md bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition">
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-100">{unit.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{unit.description}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleEdit(unit)} className="px-3 py-1 font-medium text-white rounded-md bg-gradient-to-r from-pink-700 to-orange-600">Edit</Button>
              <Button size="sm" onClick={() => handleDelete(unit._id)} className="px-3 py-1 font-medium text-white rounded-md bg-gradient-to-r from-lime-500 to-yellow-400">Delete</Button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-2xl transition-all">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">{editingUnit ? "Edit Unit" : "Add Unit"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input type="text" placeholder="Unit Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded-md w-full dark:bg-gray-700 dark:text-gray-100" required />
              <textarea placeholder="Unit Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded-md w-full dark:bg-gray-700 dark:text-gray-100" />
              <div className="flex justify-end gap-2 mt-4">
                <Button type="submit" disabled={loading} className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-md">{editingUnit ? "Update" : "Add"}</Button>
                <Button type="button" onClick={() => { resetForm(); setModalOpen(false); }} className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md">Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUnits;
