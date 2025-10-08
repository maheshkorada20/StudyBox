// import React, { useState, useEffect } from "react";
// import { adminAPI } from "@/api/admin";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";

// const AdminYears = () => {
//   const [branches, setBranches] = useState([]);
//   const [years, setYears] = useState([]);
//   const [filteredYears, setFilteredYears] = useState([]);
//   const [selectedBranch, setSelectedBranch] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingYear, setEditingYear] = useState(null);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Fetch all branches
//   const loadBranches = async () => {
//     try {
//       const data = await adminAPI.getBranches();
//       setBranches(data || []);
//     } catch (err) {
//       toast.error("Failed to load branches");
//     }
//   };

//   // Fetch years for selected branch
//   const loadYears = async (branchId) => {
//     if (!branchId) return setYears([]);
//     setLoading(true);
//     try {
//       const data = await adminAPI.getYears(branchId);
//       const yearList = Array.isArray(data) ? data : [];
//       setYears(yearList);
//       setFilteredYears(yearList);
//     } catch (err) {
//       toast.error("Failed to load years");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadBranches();
//   }, []);

//   // Filter years based on search
//   useEffect(() => {
//     const filtered = years.filter((year) =>
//       year.name?.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredYears(filtered);
//   }, [search, years]);

//   const resetForm = () => {
//     setName("");
//     setDescription("");
//     setEditingYear(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name.trim() || !selectedBranch) {
//       toast.error("Branch and year name are required");
//       return;
//     }

//     setLoading(true);
//     const payload = { name: name.trim(), description: description.trim() };

//     try {
//       if (editingYear) {
//         await adminAPI.updateYear(editingYear._id, payload);
//         toast.success("Year updated successfully!");
//       } else {
//         await adminAPI.addYear(selectedBranch, payload);
//         toast.success("Year added successfully!");
//       }
//       setModalOpen(false);
//       resetForm();
//       loadYears(selectedBranch);
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Operation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (year) => {
//     setEditingYear(year);
//     setName(year.name || "");
//     setDescription(year.description || "");
//     setModalOpen(true);
//   };

//   const handleDelete = async (yearId) => {
//     if (!window.confirm("Are you sure you want to delete this year?")) return;
//     setLoading(true);
//     try {
//       await adminAPI.deleteYear(yearId);
//       toast.success("Year deleted successfully!");
//       loadYears(selectedBranch);
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Delete failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Years</h1>

//       {/* Branch selection + Add */}
// <div className="flex flex-wrap items-center gap-4 mb-6">
//   <div className="relative w-full max-w-sm">
//     <select
//       className="appearance-none border border-gray-300 p-3 rounded-md w-full text-gray-800 font-medium focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all bg-white shadow-sm hover:shadow-md hover:scale-[1.01] cursor-pointer"
//       value={selectedBranch}
//       onChange={(e) => {
//         setSelectedBranch(e.target.value);
//         loadYears(e.target.value);
//       }}
//     >
//       <option value="">Select Branch</option>
//       {branches.map((branch) => (
//         <option key={branch._id} value={branch._id}>
//           {branch.name}
//         </option>
//       ))}
//     </select>
//     {/* Dropdown caret */}
//     <svg
//       className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       viewBox="0 0 24 24"
//     >
//       <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//     </svg>
//   </div>

//   <Button
//     onClick={() => {
//       if (!selectedBranch) return toast.error("Select a branch first");
//       resetForm();
//       setModalOpen(true);
//     }}
//     className="relative inline-flex items-center justify-center px-6 py-2 font-medium text-white rounded-md shadow-md overflow-hidden transition-all transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 before:absolute before:inset-0 before:bg-white before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-10"
//   >
//     Add Year
//   </Button>
// </div>


//       {/* Search */}
//       <input
//         type="text"
//         placeholder="Search years..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="border p-2 rounded-md w-full max-w-sm mb-4 focus:ring-2 focus:ring-indigo-400 transition-all"
//       />

//       {/* Years List */}
//       {filteredYears.length ? (
//         <ul className="space-y-3">
//           {filteredYears.map((year) => (
//             <li
//               key={year._id}
//               className="flex justify-between items-center p-4 border rounded-md shadow-sm hover:shadow-lg transition-shadow bg-white"
//             >
//               <div>
//                 <p className="font-semibold text-gray-800">{year.name}</p>
//                 <p className="text-sm text-gray-500">{year.description}</p>
//               </div>
//               <div className="flex gap-2">
//                 <Button
//                   size="sm"
//                   onClick={() => handleEdit(year)}
//                   className="px-3 py-1 font-medium text-white rounded-md shadow hover:scale-105 hover:shadow-lg transition-transform bg-gradient-to-r from-pink-700 to-orange-600"
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   size="sm"
//                   onClick={() => handleDelete(year._id)}
//                   className="px-3 py-1 font-medium text-white rounded-md shadow hover:scale-105 hover:shadow-lg transition-transform bg-gradient-to-r from-lime-500 to-yellow-400"
//                 >
//                   Delete
//                 </Button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-500">No years found for this branch.</p>
//       )}

//       {/* Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl animate-fadeIn">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//               {editingYear ? "Edit Year" : "Add Year"}
//             </h2>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//               <input
//                 type="text"
//                 placeholder="Year Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="border p-2 rounded-md w-full focus:ring-2 focus:ring-indigo-400 transition-all"
//                 required
//               />
//               <textarea
//                 placeholder="Year Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="border p-2 rounded-md w-full focus:ring-2 focus:ring-indigo-400 transition-all"
//               />
//               <div className="flex justify-end gap-2 mt-4">
//                 <Button
//                   type="submit"
//                   disabled={loading}
//                   className="relative inline-flex items-center justify-center px-6 py-2 font-medium text-white rounded-md shadow-md overflow-hidden transition-all transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 before:absolute before:inset-0 before:bg-white before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-10"
//                 >
//                   {loading ? (editingYear ? "Updating..." : "Adding...") : editingYear ? "Update" : "Add"}
//                 </Button>
//                 <Button
//                   type="button"
//                   onClick={() => { resetForm(); setModalOpen(false); }}
//                   className="relative inline-flex items-center justify-center px-6 py-2 font-medium text-gray-800 rounded-md shadow-md border border-gray-300 overflow-hidden transition-all transform hover:scale-105 hover:shadow-lg hover:bg-gray-100"
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

// export default AdminYears;

import React, { useState, useEffect } from "react";
import { adminAPI } from "@/api/admin";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

const AdminYears = () => {
const [branches, setBranches] = useState([]);
const [years, setYears] = useState([]);
const [filteredYears, setFilteredYears] = useState([]);
const [selectedBranch, setSelectedBranch] = useState("");
const [modalOpen, setModalOpen] = useState(false);
const [editingYear, setEditingYear] = useState(null);
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(false);

const loadBranches = async () => {
try {
const data = await adminAPI.getBranches();
setBranches(data || []);
} catch {
toast.error("Failed to load branches");
}
};

const loadYears = async (branchId) => {
if (!branchId) return setYears([]);
setLoading(true);
try {
const data = await adminAPI.getYears(branchId);
const list = Array.isArray(data) ? data : [];
setYears(list);
setFilteredYears(list);
} catch {
toast.error("Failed to load years");
} finally {
setLoading(false);
}
};

useEffect(() => {
loadBranches();
}, []);

useEffect(() => {
const filtered = years.filter((y) =>
y.name?.toLowerCase().includes(search.toLowerCase())
);
setFilteredYears(filtered);
}, [search, years]);

const resetForm = () => {
setName("");
setDescription("");
setEditingYear(null);
};
const openAddModal = () => {
resetForm();
setModalOpen(true);
};
const openEditModal = (year) => {
setEditingYear(year);
setName(year.name || "");
setDescription(year.description || "");
setModalOpen(true);
};

const handleSubmit = async (e) => {
e.preventDefault();
if (!name.trim() || !selectedBranch) {
toast.error("Branch and year required");
return;
}
setLoading(true);
const payload = { name: name.trim(), description: description.trim() };
try {
if (editingYear) {
await adminAPI.updateYear(editingYear._id, payload);
toast.success("Year updated!");
} else {
await adminAPI.addYear(selectedBranch, payload);
toast.success("Year added!");
}
setModalOpen(false);
resetForm();
loadYears(selectedBranch);
} catch (err) {
toast.error(err?.response?.data?.message || "Operation failed");
} finally {
setLoading(false);
}
};

const handleDelete = async (id) => {
if (!window.confirm("Are you sure?")) return;
setLoading(true);
try {
await adminAPI.deleteYear(id);
toast.success("Year deleted!");
loadYears(selectedBranch);
} catch (err) {
toast.error(err?.response?.data?.message || "Delete failed");
} finally {
setLoading(false);
}
};

return ( <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors"> <h1 className="text-3xl font-extrabold mb-6 text-gray-800 dark:text-gray-100 tracking-tight">
Manage Years </h1>


  {/* Branch Selection and Add */}
  <div className="flex flex-wrap items-center gap-4 mb-6">
    <div className="relative w-full max-w-sm">
      <select
        value={selectedBranch}
        onChange={(e) => {
          setSelectedBranch(e.target.value);
          loadYears(e.target.value);
        }}
        className="appearance-none border border-gray-300 dark:border-gray-700 p-3 rounded-lg w-full text-gray-800 dark:text-gray-100 font-medium focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 shadow-sm hover:shadow-lg hover:scale-[1.01] cursor-pointer transition-all"
      >
        <option value="">Select Branch</option>
        {branches.map((b) => (
          <option key={b._id} value={b._id}>
            {b.name}
          </option>
        ))}
      </select>
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <Button
      onClick={() => {
        if (!selectedBranch) return toast.error("Select branch first");
        openAddModal();
      }}
      className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
    >
      <Plus size={18} /> Add Year
    </Button>
  </div>

  {/* Search */}
  <div className="relative max-w-sm mb-6">
    <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
    <input
      type="text"
      placeholder="Search years..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-gray-100 transition-all"
    />
  </div>

  {/* Years List */}
  <AnimatePresence>
    {filteredYears.length ? (
      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredYears.map((y) => (
          <motion.div
            key={y._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.03 }}
            className="p-5 rounded-2xl shadow-md backdrop-blur-md border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 transition-all"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
              {y.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {y.description}
            </p>
            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                onClick={() => openEditModal(y)}
                className="flex items-center gap-1 bg-gradient-to-r from-pink-600 to-orange-500 text-white hover:scale-105 transition-transform px-3 py-1 rounded-md"
              >
                <Pencil size={14} /> Edit
              </Button>
              <Button
                size="sm"
                onClick={() => handleDelete(y._id)}
                className="flex items-center gap-1 bg-gradient-to-r from-lime-500 to-yellow-400 text-gray-900 font-medium hover:scale-105 transition-transform px-3 py-1 rounded-md"
              >
                <Trash2 size={14} /> Delete
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    ) : (
      <p className="text-gray-500 dark:text-gray-400 text-center mt-12 text-lg">
        No years found for this branch.
      </p>
    )}
  </AnimatePresence>

  {/* Modal */}
  <AnimatePresence>
    {modalOpen && (
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            {editingYear ? "Edit Year" : "Add Year"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Year Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter year name"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-gray-100 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter year description"
                rows="3"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-gray-100 transition-all"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-md shadow-md hover:scale-105 transition-transform"
              >
                {loading
                  ? editingYear
                    ? "Updating..."
                    : "Adding..."
                  : editingYear
                  ? "Update"
                  : "Add"}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  resetForm();
                  setModalOpen(false);
                }}
                className="px-5 py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</div>


);
};

export default AdminYears;
