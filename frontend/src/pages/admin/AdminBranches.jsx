// import React, { useState, useEffect } from "react";
// import { adminAPI } from "@/api/admin";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

// const AdminBranches = () => {
//   const [branches, setBranches] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [editingBranch, setEditingBranch] = useState(null);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");

//   const fetchBranches = async () => {
//     try {
//       const data = await adminAPI.getBranches();
//       setBranches(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchBranches();
//   }, []);

//   const handleAddOrUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingBranch) {
//         await adminAPI.updateBranch(editingBranch._id, { name, description });
//       } else {
//         await adminAPI.addBranch({ name, description });
//       }
//       setOpen(false);
//       setName("");
//       setDescription("");
//       setEditingBranch(null);
//       fetchBranches();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleEdit = (branch) => {
//     setEditingBranch(branch);
//     setName(branch.name);
//     setDescription(branch.description);
//     setOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this branch?")) {
//       try {
//         await adminAPI.deleteBranch(id);
//         fetchBranches();
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Branches</h1>
//       <Button onClick={() => setOpen(true)}>Add Branch</Button>

//       <ul className="mt-4 space-y-2">
//         {branches.map((branch) => (
//           <li key={branch._id} className="flex justify-between items-center p-2 border rounded">
//             <div>
//               <p className="font-semibold">{branch.name}</p>
//               <p className="text-sm text-gray-600">{branch.description}</p>
//             </div>
//             <div className="space-x-2">
//               <Button size="sm" onClick={() => handleEdit(branch)}>Edit</Button>
//               <Button size="sm" variant="destructive" onClick={() => handleDelete(branch._id)}>Delete</Button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild><></></DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{editingBranch ? "Edit Branch" : "Add Branch"}</DialogTitle>
//             <DialogDescription>
//               {editingBranch ? "Update branch details below." : "Enter branch name and description."}
//             </DialogDescription>
//           </DialogHeader>
//           <form onSubmit={handleAddOrUpdate} className="flex flex-col gap-3">
//             <input
//               type="text"
//               placeholder="Branch Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="border p-2 rounded w-full"
//               required
//             />
//             <textarea
//               placeholder="Branch Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="border p-2 rounded w-full"
//               required
//             />
//             <DialogFooter>
//               <Button type="submit">{editingBranch ? "Update" : "Add"}</Button>
//               <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default AdminBranches;

//2nd
// import React, { useState, useEffect } from "react";
// import { adminAPI } from "@/api/admin";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
//   DialogDescription,
//   DialogClose,
// } from "@/components/ui/dialog";

// const AdminBranches = () => {
//   const [branches, setBranches] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [editingBranch, setEditingBranch] = useState(null);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [message, setMessage] = useState(""); // Success/Error message

//   const fetchBranches = async () => {
//     try {
//       const data = await adminAPI.getBranches();
//       setBranches(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchBranches();
//   }, []);

//   const handleAddOrUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingBranch) {
//         await adminAPI.updateBranch(editingBranch._id, { name, description });
//         setMessage("Branch updated successfully!");
//       } else {
//         await adminAPI.addBranch({ name, description });
//         setMessage("Branch added successfully!");
//       }
//       setOpen(false);
//       setName("");
//       setDescription("");
//       setEditingBranch(null);
//       fetchBranches();
//       setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
//     } catch (err) {
//       console.error(err);
//       setMessage(err.response?.data?.message || "Something went wrong!");
//       setTimeout(() => setMessage(""), 3000);
//     }
//   };

//   const handleEdit = (branch) => {
//     setEditingBranch(branch);
//     setName(branch.name);
//     setDescription(branch.description);
//     setOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this branch?")) {
//       try {
//         await adminAPI.deleteBranch(id);
//         setMessage("Branch deleted successfully!");
//         fetchBranches();
//         setTimeout(() => setMessage(""), 3000);
//       } catch (err) {
//         console.error(err);
//         setMessage(err.response?.data?.message || "Something went wrong!");
//         setTimeout(() => setMessage(""), 3000);
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Branches</h1>

//       {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}

//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild>
//           <Button className="mb-4">{editingBranch ? "Edit Branch" : "Add Branch"}</Button>
//         </DialogTrigger>

//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{editingBranch ? "Edit Branch" : "Add Branch"}</DialogTitle>
//             <DialogDescription>
//               {editingBranch
//                 ? "Update branch details below."
//                 : "Enter branch name and description."}
//             </DialogDescription>
//           </DialogHeader>
//           <form onSubmit={handleAddOrUpdate} className="flex flex-col gap-3">
//             <input
//               type="text"
//               placeholder="Branch Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="border p-2 rounded w-full"
//               required
//             />
//             <textarea
//               placeholder="Branch Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="border p-2 rounded w-full"
//               required
//             />
//             <DialogFooter className="flex justify-end gap-2">
//               <Button type="submit">{editingBranch ? "Update" : "Add"}</Button>
//               <DialogClose asChild>
//                 <Button variant="secondary">Cancel</Button>
//               </DialogClose>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>

//       <ul className="mt-4 space-y-2">
//         {branches.map((branch) => (
//           <li
//             key={branch._id}
//             className="flex justify-between items-center p-2 border rounded"
//           >
//             <div>
//               <p className="font-semibold">{branch.name}</p>
//               <p className="text-sm text-gray-600">{branch.description}</p>
//             </div>
//             <div className="space-x-2">
//               <Button size="sm" onClick={() => handleEdit(branch)}>
//                 Edit
//               </Button>
//               <Button
//                 size="sm"
//                 variant="destructive"
//                 onClick={() => handleDelete(branch._id)}
//               >
//                 Delete
//               </Button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminBranches;

// import React, { useState, useEffect } from "react";
// import { adminAPI } from "@/api/admin";
// import { Button } from "@/components/ui/button";

// const AdminBranches = () => {
//   const [branches, setBranches] = useState([]);
//   const [filteredBranches, setFilteredBranches] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingBranch, setEditingBranch] = useState(null);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Fetch branches
//   const fetchBranches = async () => {
//     try {
//       const data = await adminAPI.getBranches();
//       const branchList = Array.isArray(data) ? data : [];
//       setBranches(branchList);
//       setFilteredBranches(branchList);
//     } catch (err) {
//       console.error("Failed to fetch branches:", err);
//       setMessage("Failed to load branches. Check console/network.");
//       setTimeout(() => setMessage(""), 3000);
//     }
//   };

//   useEffect(() => {
//     fetchBranches();
//   }, []);

//   // Filter branches
//   useEffect(() => {
//     const filtered = branches.filter((branch) =>
//       branch.name?.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredBranches(filtered);
//   }, [search, branches]);

//   // Reset form
//   const resetForm = () => {
//     setName("");
//     setDescription("");
//     setEditingBranch(null);
//   };

//   // Add / Update branch
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name.trim() || !description.trim()) {
//       setMessage("Please fill name and description.");
//       setTimeout(() => setMessage(""), 3000);
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = { name: name.trim(), description: description.trim() };
//       if (editingBranch) {
//         await adminAPI.updateBranch(editingBranch._id, payload);
//         setMessage("Branch updated successfully!");
//       } else {
//         await adminAPI.addBranch(payload);
//         setMessage("Branch added successfully!");
//       }
//       setModalOpen(false);
//       resetForm();
//       fetchBranches();
//       setTimeout(() => setMessage(""), 3000);
//     } catch (err) {
//       console.error("Add/Update branch failed:", err);
//       setMessage(err?.response?.data?.message || "Operation failed. Check console/network.");
//       setTimeout(() => setMessage(""), 3000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (branch) => {
//     setEditingBranch(branch);
//     setName(branch.name || "");
//     setDescription(branch.description || "");
//     setModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this branch?")) return;

//     setLoading(true);
//     try {
//       await adminAPI.deleteBranch(id);
//       setMessage("Branch deleted successfully!");
//       fetchBranches();
//       setTimeout(() => setMessage(""), 3000);
//     } catch (err) {
//       console.error("Delete failed:", err);
//       setMessage(err?.response?.data?.message || "Delete failed. Check console/network.");
//       setTimeout(() => setMessage(""), 3000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800"> Manage Branches</h1>

//       {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}

//       {/* Search + Add */}
//       <div className="flex justify-between items-center mb-6 gap-3">
//         <input
//           type="text"
//           placeholder="Search branches..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border p-2 rounded-md w-full max-w-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
//         />
//         <Button
//           onClick={() => { resetForm(); setModalOpen(true); }}
//           className="relative inline-flex items-center justify-center px-6 py-2 font-medium text-white rounded-md shadow-md overflow-hidden transition-all transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 before:absolute before:inset-0 before:bg-white before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-10"
//         >
//           Add Branch
//         </Button>
//       </div>

//       {/* Branch List */}
//       {filteredBranches.length ? (
//         <ul className="space-y-3">
//           {filteredBranches.map((branch) => (
//             <li key={branch._id} className="flex justify-between items-center p-4 border rounded-md shadow-sm hover:shadow-lg transition-shadow bg-white">
//               <div>
//                 <p className="font-semibold text-gray-800">{branch.name}</p>
//                 <p className="text-sm text-gray-500">{branch.description}</p>
//               </div>
//              <div className="flex gap-2">
//   <Button
//     size="sm"
//     onClick={() => handleEdit(branch)}
//     className="px-3 py-1 font-medium text-white rounded-md shadow hover:scale-105 hover:shadow-lg transition-transform bg-gradient-to-r from-pink-700 to-orange-600"
//   >
//     Edit
//   </Button>
//   <Button
//     size="sm"
//     onClick={() => handleDelete(branch._id)}
//     className="px-3 py-1 font-medium text-white rounded-md shadow hover:scale-105 hover:shadow-lg transition-transform bg-gradient-to-r from-lime-500 to-yellow-400"
//   >
//     Delete
//   </Button>
// </div>

//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-500">No branches found.</p>
//       )}

//       {/* Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl animate-fadeIn">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-800">{editingBranch ? "Edit Branch" : "Add Branch"}</h2>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//               <input
//                 type="text"
//                 placeholder="Branch Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="border p-2 rounded-md w-full focus:ring-2 focus:ring-indigo-400 transition-all"
//                 required
//               />
//               <textarea
//                 placeholder="Branch Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="border p-2 rounded-md w-full focus:ring-2 focus:ring-indigo-400 transition-all"
//                 required
//               />
//               <div className="flex justify-end gap-2 mt-4">
//                 <Button
//                   type="submit"
//                   disabled={loading}
//                   className="relative inline-flex items-center justify-center px-6 py-2 font-medium text-white rounded-md shadow-md overflow-hidden transition-all transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 before:absolute before:inset-0 before:bg-white before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-10"
//                 >
//                   {loading ? (editingBranch ? "Updating..." : "Adding...") : (editingBranch ? "Update" : "Add")}
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

// export default AdminBranches;


import React, { useState, useEffect } from "react";
import { adminAPI } from "@/api/admin";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

const AdminBranches = () => {
const [branches, setBranches] = useState([]);
const [filteredBranches, setFilteredBranches] = useState([]);
const [modalOpen, setModalOpen] = useState(false);
const [editingBranch, setEditingBranch] = useState(null);
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(false);

// Fetch all branches
const loadBranches = async () => {
try {
const data = await adminAPI.getBranches();
const list = Array.isArray(data) ? data : [];
setBranches(list);
setFilteredBranches(list);
} catch (err) {
toast.error("Failed to load branches");
}
};

useEffect(() => { loadBranches(); }, []);

useEffect(() => {
const filtered = branches.filter((b) =>
b.name?.toLowerCase().includes(search.toLowerCase())
);
setFilteredBranches(filtered);
}, [search, branches]);

const resetForm = () => {
setName("");
setDescription("");
setEditingBranch(null);
};

const openAddModal = () => {
resetForm();
setModalOpen(true);
};

const openEditModal = (branch) => {
setEditingBranch(branch);
setName(branch.name || "");
setDescription(branch.description || "");
setModalOpen(true);
};

const handleSubmit = async (e) => {
e.preventDefault();
if (!name.trim() || !description.trim()) {
toast.error("Name and description required");
return;
}
setLoading(true);
const payload = { name: name.trim(), description: description.trim() };
try {
if (editingBranch) {
await adminAPI.updateBranch(editingBranch._id, payload);
toast.success("Branch updated!");
} else {
await adminAPI.addBranch(payload);
toast.success("Branch added!");
}
setModalOpen(false);
resetForm();
loadBranches();
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
await adminAPI.deleteBranch(id);
toast.success("Branch deleted!");
loadBranches();
} catch (err) {
toast.error(err?.response?.data?.message || "Delete failed");
} finally {
setLoading(false);
}
};

return ( <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors"> <h1 className="text-3xl font-extrabold mb-6 text-gray-800 dark:text-gray-100 tracking-tight">Manage Branches</h1>


  {/* Search and Add */}
  <div className="flex flex-wrap items-center gap-4 mb-8">
    <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search branches..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-gray-100 transition-all"
      />
    </div>
    <Button
      onClick={openAddModal}
      className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
    >
      <Plus size={18} /> Add Branch
    </Button>
  </div>

  {/* Branch List */}
  <AnimatePresence>
    {filteredBranches.length ? (
      <motion.div
        layout
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredBranches.map((b) => (
          <motion.div
            key={b._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.03 }}
            className="p-5 rounded-2xl shadow-md backdrop-blur-md border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 transition-all"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">{b.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{b.description}</p>
            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                onClick={() => openEditModal(b)}
                className="flex items-center gap-1 bg-gradient-to-r from-pink-600 to-orange-500 text-white hover:scale-105 transition-transform px-3 py-1 rounded-md"
              >
                <Pencil size={14} /> Edit
              </Button>
              <Button
                size="sm"
                onClick={() => handleDelete(b._id)}
                className="flex items-center gap-1 bg-gradient-to-r from-lime-500 to-yellow-400 text-gray-900 font-medium hover:scale-105 transition-transform px-3 py-1 rounded-md"
              >
                <Trash2 size={14} /> Delete
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    ) : (
      <p className="text-gray-500 dark:text-gray-400 text-center mt-12 text-lg">No branches found.</p>
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
            {editingBranch ? "Edit Branch" : "Add Branch"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Branch Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter branch name"
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
                placeholder="Enter branch description"
                rows="3"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-gray-100 transition-all"
                required
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-md shadow-md hover:scale-105 transition-transform"
              >
                {loading ? (editingBranch ? "Updating..." : "Adding...") : editingBranch ? "Update" : "Add"}
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

export default AdminBranches;
