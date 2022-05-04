import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/results?search=${searchTerm}`);
    setSearchTerm("");
  };

  const iconStyle = { color: ` var(--yellow)` };
  return (
    <form onSubmit={handleSearch}>
      <label htmlFor="search">
        <BiSearch size="20px" style={iconStyle} />
      </label>

      <input
        type="text"
        name="search"
        placeholder="Search "
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </form>
  );
};

export default Search;
