// src/components/common/SearchBar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "lucide-react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/student/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md mx-auto md:mx-0 gap-2"
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search topics, subjects..."
        className="flex-1 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
      >
        <MagnifyingGlass className="h-4 w-4" />
      </button>
    </form>
  );
};

export default SearchBar;
