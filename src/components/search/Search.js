import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    /**if user is not on the results page then navigate to the results page
     * if user is on the results page then update the path to the new search term without refreshing the page
     */
    if (window.location.pathname !== "/results?search=") {
      navigate(`/results?search=${searchTerm}`);
    } else {
      navigate(`/results?search=${searchTerm}`, { replace: true });
    }

    props.setshowSearch(false);
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
