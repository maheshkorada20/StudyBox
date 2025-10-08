// src/pages/admin/AdminAllResources.jsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { adminAPI } from "@/api/admin";

const AdminAllResources = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all resources (v5 object syntax)
  const { data: resources = [], isLoading } = useQuery({
    queryKey: ["allResources"],
    queryFn: async () => {
      // call the correct API function
      return await adminAPI.getResources();
    },
  });

  // Delete resource handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resource?")) return;
    try {
      await adminAPI.deleteResource(id);
      queryClient.invalidateQueries({ queryKey: ["allResources"] });
      alert("Resource deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete resource");
    }
  };

  const filteredResources = resources.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <p>Loading resources...</p>;

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">All Resources</h1>

      <div className="mb-4 flex items-center gap-2">
        <Input
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button onClick={() => setSearchTerm("")}>Clear</Button>
      </div>

      <table className="w-full border-collapse table-auto text-left">
        <thead>
          <tr className="border-b border-gray-300 dark:border-gray-700">
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Topic</th>
            <th className="py-2 px-4">Added By</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredResources.map((res) => (
            <tr
              key={res._id}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <td className="py-2 px-4">{res.title}</td>
              <td className="py-2 px-4">{res.topic?.title || "N/A"}</td>
              <td className="py-2 px-4">
                {res.addedBy ? `${res.addedBy.firstName} ${res.addedBy.lastName}` : "N/A"}
              </td>
              <td className="py-2 px-4 flex gap-2">
                <Button onClick={() => alert("Edit functionality here")} variant="outline">
                  <Edit size={16} />
                </Button>
                <Button onClick={() => handleDelete(res._id)} variant="destructive">
                  <Trash2 size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredResources.length === 0 && (
        <p className="mt-4 text-gray-600 dark:text-gray-300">No resources found.</p>
      )}
    </main>
  );
};

export default AdminAllResources;
