import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("lands of");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchMovies = async (movieName) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}`
      );

      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError("Something went wrong.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(search);
  }, []);

  return (
    <div className="container">
      <h1>Movie Search</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
        fetchMovies={fetchMovies}
      />

      {loading && <h2>Loading...</h2>}

      {error && <h2>{error}</h2>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;