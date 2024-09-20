import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "../../../components/dashboard/searchPost/SearchPost.css";

function SearchPost() {
  const [query, setQuery] = useState("");

  const handleSearchChange = e => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    console.log("Search query:", query);
  };

  return (
    <div className="search-background">
      <div className="search-inner">
        <div className="search-pic">
          <img src="/Images/seaPic.png" alt="Logo" />
        </div>
        <form onSubmit={handleSearchSubmit} className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="What's on your Mind?"
            value={query}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-button">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchPost;
