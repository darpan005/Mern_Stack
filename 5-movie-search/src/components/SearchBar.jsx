function SearchBar({ search, setSearch, fetchMovies }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search movie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            fetchMovies(search);
          }
        }}
      />

      <button onClick={() => fetchMovies(search)}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;